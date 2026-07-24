import uuid
from datetime import datetime
from sqlalchemy import String, Float, ForeignKey, DateTime, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.modules.base_models import AuditModel

class Trip(AuditModel):
    __tablename__ = "trips"

    driver_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("drivers.id"), nullable=False, index=True)
    vehicle_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicles.id"), nullable=False, index=True)
    
    start_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    end_time: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    
    origin_name: Mapped[str] = mapped_column(String(255), nullable=False)
    destination_name: Mapped[str] = mapped_column(String(255), nullable=False)
    
    total_distance: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)       # miles/km
    total_fuel_consumed: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)  # gallons/kWh
    efficiency_score: Mapped[float] = mapped_column(Float, default=100.0, nullable=False)   # 0 to 100
    safety_score: Mapped[float] = mapped_column(Float, default=100.0, nullable=False)       # 0 to 100
    
    route_geometry: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)        # List of coordinates

    # Relationships
    driver = relationship("Driver", back_populates="trips")
    vehicle = relationship("Vehicle", back_populates="trips")
    navigation_routes = relationship("NavigationRoute", back_populates="trip")
