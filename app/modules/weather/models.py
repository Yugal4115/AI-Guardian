from datetime import datetime
from sqlalchemy import Float, String, Boolean, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from app.modules.base_models import AuditModel

class WeatherImpactLog(AuditModel):
    __tablename__ = "weather_impact_logs"

    latitude: Mapped[float] = mapped_column(Float, nullable=False, index=True)
    longitude: Mapped[float] = mapped_column(Float, nullable=False, index=True)
    
    condition: Mapped[str] = mapped_column(String(100), nullable=False)                  # SUNNY, RAIN, SNOW, FOG, ICE
    precipitation_rate: Mapped[float] = mapped_column(Float, default=0.0, nullable=False) # mm/hr
    visibility: Mapped[float] = mapped_column(Float, default=10.0, nullable=False)        # miles / km
    
    traction_rating: Mapped[float] = mapped_column(Float, default=1.0, nullable=False)    # 0.0 to 1.0 (friction coefficient)
    severe_weather_alert: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    
    recorded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), index=True)
