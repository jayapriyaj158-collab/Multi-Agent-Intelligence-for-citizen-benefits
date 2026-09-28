from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
import datetime
from app.database import get_db
from app.models.user import User
from app.models.notification import SupportTicket
from app.utils.security import require_current_user

router = APIRouter(prefix="/support", tags=["Human Escalation & Support"])

class TicketCreate(BaseModel):
    issue_type: str
    scheme_id: Optional[int] = None
    application_id: Optional[int] = None
    description: str

@router.post("")
def create_ticket(
    req: TicketCreate,
    current_user: User = Depends(require_current_user),
    db: Session = Depends(get_db)
):
    now = datetime.datetime.utcnow()
    ticket_num = f"TKT-{now.year}-{int(now.timestamp()) % 100000:05d}"

    ticket = SupportTicket(
        user_id=current_user.id,
        ticket_number=ticket_num,
        issue_type=req.issue_type,
        scheme_id=req.scheme_id,
        application_id=req.application_id,
        description=req.description,
        status="OPEN"
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    return {
        "id": ticket.id,
        "ticket_number": ticket.ticket_number,
        "issue_type": ticket.issue_type,
        "status": ticket.status,
        "message": "Support ticket created successfully. An assigned welfare officer will review your request.",
        "created_at": ticket.created_at.isoformat()
    }

@router.get("")
def get_user_tickets(current_user: User = Depends(require_current_user), db: Session = Depends(get_db)):
    tickets = db.query(SupportTicket).filter(SupportTicket.user_id == current_user.id).all()
    return [
        {
            "id": t.id,
            "ticket_number": t.ticket_number,
            "issue_type": t.issue_type,
            "description": t.description,
            "status": t.status,
            "admin_response": t.admin_response,
            "created_at": t.created_at.isoformat() if t.created_at else None
        }
        for t in tickets
    ]
