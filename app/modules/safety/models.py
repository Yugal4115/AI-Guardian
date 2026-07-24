import uuid
from datetime import datetime
from sqlalchemy import Float, ForeignKey, JSON, String, Boolean, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.modules.base_models import AuditModel

class SafetyRisk(AuditModel):
    __tablename__ = "safety_risks"

    vehicle_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicles.id"), nullable=False, index=True)
    
    collision_probability: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)   # 0.0 to 1.0
    warning_level: Mapped[str] = mapped_column(String(50), default="INFO", nullable=False)     # INFO, CAUTION, CRITICAL
    threat_details: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)            # Surrounding vehicles, speed differential
    
    lane_drift_hazard: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    following_distance_gap: Mapped[float] = mapped_column(Float, default=3.0, nullable=False)  # seconds
    
    recorded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), index=True)

    # Relationships
    vehicle = relationship("Vehicle")
class NearMissIncident(AuditModel):
    __tablename__ = "near_miss_incidents"

    vehicle_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicles.id"), nullable=False, index=True)
    severity_score: Mapped[float] = mapped_column(Float, nullable=False)                  # 0 to 1
    description: Mapped[str] = mapped_column(String(255), nullable=False)
    recorded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), index=True)

    # Relationships
    vehicle = relationship("Vehicle")
