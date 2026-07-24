import uuid
from datetime import datetime
from sqlalchemy import String, Integer, Float, ForeignKey, JSON, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.modules.base_models import AuditModel

class Vehicle(AuditModel):
    __tablename__ = "vehicles"

    vin: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    make: Mapped[str] = mapped_column(String(100), nullable=False)
    model: Mapped[str] = mapped_column(String(100), nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    fuel_type: Mapped[str] = mapped_column(String(20), default="EV", nullable=False)  # EV, GASOLINE, DIESEL, HYBRID
    battery_capacity: Mapped[float] = mapped_column(Float, nullable=True)             # kWh for EVs
    fuel_capacity: Mapped[float] = mapped_column(Float, nullable=True)                # Gallons / Litres
    current_status: Mapped[str] = mapped_column(String(50), default="ACTIVE", nullable=False)  # ACTIVE, MAINTENANCE, LIMP_MODE, DECOMMISSIONED
    digital_twin_metadata: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)

    # Relationships
    fleets = relationship("Fleet", secondary="fleet_vehicle_association", back_populates="vehicles")
    telemetry_logs = relationship("TelemetryLog", back_populates="vehicle")
    trips = relationship("Trip", back_populates="vehicle")
    maintenance_tasks = relationship("MaintenanceTask", back_populates="vehicle")


class TelemetryLog(AuditModel):
    __tablename__ = "telemetry_logs"

    vehicle_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicles.id"), nullable=False, index=True)
    speed: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    rpm: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    throttle: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    fuel_level: Mapped[float] = mapped_column(Float, nullable=True)          # Percentage (0-100) or Gallons
    battery_soc: Mapped[float] = mapped_column(Float, nullable=True)         # EV State of Charge (0-100)
    battery_temp: Mapped[float] = mapped_column(Float, nullable=True)        # Celsius
    transmission_temp: Mapped[float] = mapped_column(Float, nullable=True)   # Celsius
    brake_pressure: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    coolant_temp: Mapped[float] = mapped_column(Float, nullable=True)        # Celsius
    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)
    elevation: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    
    # 9-Axis IMU (Inertial Measurement Unit)
    imu_accel_x: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    imu_accel_y: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    imu_accel_z: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    roll: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    pitch: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    yaw: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    
    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), index=True)

    # Relationships
    vehicle = relationship("Vehicle", back_populates="telemetry_logs")
