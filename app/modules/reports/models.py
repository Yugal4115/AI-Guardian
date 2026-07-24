import uuid
from sqlalchemy import String, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.modules.base_models import AuditModel

class Report(AuditModel):
    __tablename__ = "reports"

    title: Mapped[str] = mapped_column(String(200), nullable=False)
    type: Mapped[str] = mapped_column(String(100), default="WEEKLY_SAFETY", nullable=False)  # WEEKLY_SAFETY, VEHICLE_HEALTH, INSURANCE_COMPLIANCE
    storage_url: Mapped[str] = mapped_column(String(500), nullable=False)                    # S3 or static URL
    
    generated_by_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    metadata_payload: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)       # Aggregated stats, filters used

    # Relationships
    generated_by = relationship("User")
