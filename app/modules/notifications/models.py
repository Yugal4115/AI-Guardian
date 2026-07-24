import uuid
from datetime import datetime
from sqlalchemy import String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.modules.base_models import AuditModel

class Notification(AuditModel):
    __tablename__ = "notifications"

    recipient_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str] = mapped_column(String(1000), nullable=False)
    
    priority: Mapped[str] = mapped_column(String(50), default="LOW", nullable=False)       # LOW, MEDIUM, HIGH, CRITICAL
    channel: Mapped[str] = mapped_column(String(50), default="PUSH", nullable=False)       # SMS, EMAIL, PUSH, SLACK
    
    sent_status: Mapped[str] = mapped_column(String(50), default="SENT", nullable=False)   # PENDING, SENT, FAILED
    read_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    recipient = relationship("User")
