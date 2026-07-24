import uuid
from datetime import datetime
from sqlalchemy import String, Float, ForeignKey, JSON, DateTime, Integer, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.modules.base_models import AuditModel

class AIContext(AuditModel):
    __tablename__ = "ai_contexts"

    trip_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("trips.id"), nullable=False, index=True)
    driver_fatigue_score: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    road_condition: Mapped[str] = mapped_column(String(100), default="NORMAL", nullable=False)
    weather_severity: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    global_risk_score: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    active_agent_states: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)
    
    recorded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), index=True)


class AIMemory(AuditModel):
    __tablename__ = "ai_memories"

    type: Mapped[str] = mapped_column(String(50), nullable=False, index=True)              # EPISODIC, SEMANTIC, PROCEDURAL, PREDICTIVE
    payload: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)
    vector_embedding: Mapped[dict] = mapped_column(JSON, default=dict, nullable=True)     # Stores parsed vectors
    
    importance_weight: Mapped[float] = mapped_column(Float, default=1.0, nullable=False)   # 1.0 to 10.0 scale
    access_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    last_accessed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class AIDecision(AuditModel):
    __tablename__ = "ai_decisions"

    trip_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("trips.id"), nullable=False, index=True)
    reasoning_chain: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)      # Explanation trace / weights / SHAP
    confidence_score: Mapped[float] = mapped_column(Float, default=1.0, nullable=False)     # 0.0 to 1.0
    proposed_actions: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)      # Command arrays
    
    status: Mapped[str] = mapped_column(String(50), default="PENDING", nullable=False)     # PENDING_DRIVER, EXECUTED, REJECTED, AUTO_BYPASSED
    action_taken: Mapped[str] = mapped_column(String(255), nullable=True)


class ConversationSession(AuditModel):
    __tablename__ = "ai_conversation_sessions"

    driver_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("drivers.id"), nullable=False, index=True)
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    ended_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    messages = relationship("ConversationMessage", back_populates="session")


class ConversationMessage(AuditModel):
    __tablename__ = "ai_conversation_messages"

    session_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("ai_conversation_sessions.id"), nullable=False, index=True)
    role: Mapped[str] = mapped_column(String(50), nullable=False)                          # user, system, assistant
    content: Mapped[str] = mapped_column(String(2000), nullable=False)
    
    intent_classification: Mapped[str | None] = mapped_column(String(100), nullable=True)
    reasoning_context: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)    # what agent observed when speaking
    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), index=True)

    # Relationships
    session = relationship("ConversationSession", back_populates="messages")
