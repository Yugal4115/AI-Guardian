import uuid
from datetime import datetime
from sqlalchemy import String, Integer, Float, Boolean, ForeignKey, JSON, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.modules.base_models import AuditModel

class Driver(AuditModel):
    __tablename__ = "drivers"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, unique=True)
    license_number: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    experience_years: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    safety_score: Mapped[float] = mapped_column(Float, default=100.0, nullable=False)
    cognitive_baseline: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)  # Baselines for attention
    emergency_contact: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)   # Phone, Name, Relation
    is_active_duty: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Relationships
    user = relationship("User", back_populates="driver_profile")
    behavioral_logs = relationship("DriverBehavioralLog", back_populates="driver")
    trips = relationship("Trip", back_populates="driver")


class DriverBehavioralLog(AuditModel):
    __tablename__ = "driver_behavioral_logs"

    driver_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("drivers.id"), nullable=False, index=True)
    fatigue_score: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)        # 0 to 1
    eye_closure_duration: Mapped[float] = mapped_column(Float, default=0.0, nullable=False) # seconds
    head_angle_deviation: Mapped[float] = mapped_column(Float, default=0.0, nullable=False) # degrees
    distraction_flag: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    stress_level: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)         # 0 to 1
    recorded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), index=True)

    # Relationships
    driver = relationship("Driver", back_populates="behavioral_logs")
