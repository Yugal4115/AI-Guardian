import uuid
from datetime import datetime
from sqlalchemy import Float, ForeignKey, JSON, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.modules.base_models import AuditModel

class NavigationRoute(AuditModel):
    __tablename__ = "navigation_routes"

    trip_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("trips.id"), nullable=False, index=True)
    path_coordinates: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)   # GeoJSON LineString
    
    eta_confidence_low: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    eta_confidence_high: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    estimated_duration: Mapped[float] = mapped_column(Float, nullable=False)            # seconds
    
    hazard_score: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)     # 0 to 100
    optimization_type: Mapped[str] = mapped_column(String(50), default="MIN_TIME", nullable=False)  # MIN_TIME, MIN_FUEL, MAX_SAFETY

    # Relationships
    trip = relationship("Trip", back_populates="navigation_routes")
