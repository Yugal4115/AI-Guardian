import uuid
from datetime import datetime
from sqlalchemy import Integer, Float, ForeignKey, JSON, String, Boolean, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.modules.base_models import AuditModel

class EmergencyIncident(AuditModel):
    __tablename__ = "emergency_incidents"

    vehicle_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicles.id"), nullable=False, index=True)
    driver_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("drivers.id"), nullable=False, index=True)
    
    crash_severity: Mapped[int] = mapped_column(Integer, default=0, nullable=False)       # 0 to 5 (5 is catastrophic)
    impact_angle: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)         # degrees
    impact_force_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)       # G-force
    
    occupant_count: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    is_airbag_deployed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    
    triage_status: Mapped[str] = mapped_column(String(50), default="PENDING", nullable=False) # PENDING, DISPATCHED, RESOLVED
    sos_routing_details: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)      # Dispatch routing metadata
    
    recorded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), index=True)

    # Relationships
    vehicle = relationship("Vehicle")
    driver = relationship("Driver")
