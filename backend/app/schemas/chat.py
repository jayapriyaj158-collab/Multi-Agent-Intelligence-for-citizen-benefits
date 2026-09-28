from typing import Optional, List, Dict, Any
from pydantic import BaseModel

class AgentTraceItem(BaseModel):
    agent_name: str
    status: str
    summary: str
    duration_ms: float

class CitationItem(BaseModel):
    source_name: str
    source_url: str
    source_level: int # 1 to 4
    last_verified: str
    relevance_snippet: str

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None
    language: Optional[str] = "en" # "en", "ta", "hi"
    profile_context: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    conversation_id: int
    reply: str
    language: str
    intent: str
    confidence: float
    agents_called: List[AgentTraceItem]
    citations: List[CitationItem]
    card_type: Optional[str] = None # "schemes", "eligibility", "documents", "application_steps", "missing_questions", "timeline"
    card_data: Optional[Any] = None
    suggested_actions: Optional[List[str]] = []
    voice_audio_hint: Optional[str] = None # Text to speak
    audit_run_id: Optional[int] = None
