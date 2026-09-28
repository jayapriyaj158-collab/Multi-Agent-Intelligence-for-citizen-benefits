from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any, List
from app.database import get_db
from app.models.user import User, Profile
from app.models.scheme import Scheme
from app.models.ai_audit import AIConversation, AIMessage, AIAgentRun
from app.schemas.chat import ChatRequest, ChatResponse
from app.utils.security import get_current_user
from app.agents.orchestrator import orchestrator
from app.agents.benefit_gap_agent import benefit_gap_agent
from app.agents.rag_engine import rag_engine
from app.routers.schemes import _scheme_to_dict

router = APIRouter(prefix="/ai", tags=["Multi-Agent AI"])

@router.post("/chat", response_model=ChatResponse)
def handle_ai_chat(
    req: ChatRequest,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # 1. Fetch or create conversation
    conv = None
    if req.conversation_id:
        conv = db.query(AIConversation).filter(AIConversation.id == req.conversation_id).first()
    
    if not conv:
        conv = AIConversation(
            user_id=current_user.id if current_user else None,
            language=req.language or "en",
            title=req.message[:50] + "..."
        )
        db.add(conv)
        db.commit()
        db.refresh(conv)

    # 2. Record citizen message
    user_msg = AIMessage(
        conversation_id=conv.id,
        sender="citizen",
        content=req.message,
        message_type="text"
    )
    db.add(user_msg)
    db.commit()

    # 3. Assemble profile context
    profile_context = {}
    if current_user and current_user.profile:
        p = current_user.profile
        profile_context = {
            "age": p.age,
            "gender": p.gender,
            "state": p.state,
            "occupation": p.occupation,
            "education": p.education,
            "annual_income": p.annual_income,
            "social_category": p.social_category,
            "marital_status": p.marital_status,
            "residence_type": p.residence_type,
            "completion_percentage": p.completion_percentage
        }
    if req.profile_context:
        profile_context.update(req.profile_context)

    # 4. Fetch all active schemes
    all_schemes = db.query(Scheme).filter(Scheme.verification_status != "ARCHIVED").all()
    schemes_pool = [_scheme_to_dict(s) for s in all_schemes]

    # Index RAG if not already indexed
    if not rag_engine.is_indexed:
        rag_engine.build_index(schemes_pool)

    # Fetch uploaded document types if user logged in
    uploaded_docs = []
    if current_user:
        from app.models.document import Document
        docs = db.query(Document).filter(Document.user_id == current_user.id).all()
        uploaded_docs = [d.document_type for d in docs]

    # 5. Execute Multi-Agent Orchestration
    result = orchestrator.process_citizen_query(
        message=req.message,
        conversation_id=conv.id,
        user_profile=profile_context,
        schemes_pool=schemes_pool,
        user_uploaded_docs=uploaded_docs,
        language_override=req.language
    )

    # 6. Update user's profile in database if new demographic details were extracted
    if current_user and current_user.profile and result.get("updated_profile"):
        up = result["updated_profile"]
        prof = current_user.profile
        for f in ["age", "gender", "state", "occupation", "education", "annual_income", "social_category", "marital_status"]:
            if up.get(f) is not None:
                setattr(prof, f, up[f])
        prof.completion_percentage = up.get("completion_percentage", prof.completion_percentage)
        db.commit()

    # 7. Record AI Response in database
    ai_msg = AIMessage(
        conversation_id=conv.id,
        sender="orchestrator",
        content=result["reply"],
        message_type="hybrid_cards" if result.get("card_data") else "text",
        agent_metadata={
            "agents_called": result["agents_called"],
            "citations": result["citations"],
            "card_type": result.get("card_type")
        }
    )
    db.add(ai_msg)

    # 8. Record AI Agent Run for Audit
    run_audit = AIAgentRun(
        user_id=current_user.id if current_user else None,
        intent=result["intent"],
        agents_called=[a["agent_name"] for a in result["agents_called"]],
        rules_evaluated_count=len(schemes_pool),
        execution_time_ms=result["total_execution_ms"],
        audit_summary=f"Processed query in {result['language']}. Cards returned: {result.get('card_type') or 'None'}."
    )
    db.add(run_audit)
    db.commit()
    db.refresh(run_audit)

    return ChatResponse(
        conversation_id=conv.id,
        reply=result["reply"],
        language=result["language"],
        intent=result["intent"],
        confidence=result["confidence"],
        agents_called=result["agents_called"],
        citations=result["citations"],
        card_type=result.get("card_type"),
        card_data=result.get("card_data"),
        suggested_actions=result.get("suggested_actions", []),
        voice_audio_hint=result.get("voice_audio_hint"),
        audit_run_id=run_audit.id
    )

@router.post("/benefit-gap")
def get_benefit_gaps(
    current_user: Optional[User] = Depends(get_current_user),
    profile_override: Optional[Dict[str, Any]] = None,
    db: Session = Depends(get_db)
):
    profile_data = {}
    if current_user and current_user.profile:
        p = current_user.profile
        profile_data = {
            "age": p.age,
            "gender": p.gender,
            "state": p.state,
            "occupation": p.occupation,
            "education": p.education,
            "annual_income": p.annual_income,
            "social_category": p.social_category,
            "marital_status": p.marital_status
        }
    if profile_override:
        profile_data.update(profile_override)

    all_schemes = db.query(Scheme).filter(Scheme.verification_status != "ARCHIVED").all()
    schemes_pool = [_scheme_to_dict(s) for s in all_schemes]

    return benefit_gap_agent.analyze_benefit_gaps(
        profile=profile_data,
        known_scheme_ids=[],
        all_schemes=schemes_pool
    )

@router.get("/audit-logs")
def get_audit_logs(limit: int = 15, db: Session = Depends(get_db)):
    runs = db.query(AIAgentRun).order_by(AIAgentRun.timestamp.desc()).limit(limit).all()
    return [
        {
            "id": r.id,
            "user_id": r.user_id,
            "intent": r.intent,
            "agents_called": r.agents_called,
            "rules_evaluated_count": r.rules_evaluated_count,
            "execution_time_ms": r.execution_time_ms,
            "audit_summary": r.audit_summary,
            "timestamp": r.timestamp.isoformat()
        }
        for r in runs
    ]
