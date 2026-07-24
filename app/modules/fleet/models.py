import uuid
from sqlalchemy import String, ForeignKey, Table, Column
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.modules.base_models import AuditModel
from app.database import Base

# Association Tables
fleet_vehicle_association = Table(
    "fleet_vehicle_association",
    Base.metadata,
    Column("fleet_id", UUID(as_uuid=True), ForeignKey("fleets.id", ondelete="CASCADE"), primary_key=True),
    Column("vehicle_id", UUID(as_uuid=True), ForeignKey("vehicles.id", ondelete="CASCADE"), primary_key=True)
)

fleet_driver_association = Table(
    "fleet_driver_association",
    Base.metadata,
    Column("fleet_id", UUID(as_uuid=True), ForeignKey("fleets.id", ondelete="CASCADE"), primary_key=True),
    Column("driver_id", UUID(as_uuid=True), ForeignKey("drivers.id", ondelete="CASCADE"), primary_key=True)
)

class Fleet(AuditModel):
    __tablename__ = "fleets"

    name: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=True)

    # Relationships
    vehicles = relationship("Vehicle", secondary=fleet_vehicle_association, back_populates="fleets")
    drivers = relationship("Driver", secondary=fleet_driver_association)
