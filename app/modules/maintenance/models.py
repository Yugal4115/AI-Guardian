import uuid
from datetime import datetime
from sqlalchemy import String, Float, ForeignKey, JSON, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.modules.base_models import AuditModel

class MaintenanceTask(AuditModel):
    __tablename__ = "maintenance_tasks"

    vehicle_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicles.id"), nullable=False, index=True)
    component_name: Mapped[str] = mapped_column(String(100), nullable=False)               # BRAKE_PADS, ENGINE_OIL, BATTERY_CELL, TIRE_ALIGNMENT
    
    remaining_useful_life_days: Mapped[float] = mapped_column(Float, nullable=False)       # Remaining Useful Life
    estimated_failure_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    
    urgency_score: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)       # 0 to 100
    cost_benefit_analysis: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False) # repair vs replace cost logic
    parts_preordered: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    
    status: Mapped[str] = mapped_column(String(50), default="PENDING", nullable=False)     # PENDING, SCHEDULED, COMPLETED, OVERDUE
    scheduled_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    vehicle = relationship("Vehicle", back_populates="maintenance_tasks")
