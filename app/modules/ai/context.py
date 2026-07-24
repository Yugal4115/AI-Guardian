import logging
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.ai.repository import AIContextRepository
from app.modules.ai.models import AIContext
from app.modules.vehicles.service import VehicleService
from app.modules.drivers.service import DriverService
from app.modules.weather.models import WeatherImpactLog
from sqlalchemy.future import select

logger = logging.getLogger("gaurdian.ai.context")

class ContextManager:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = AIContextRepository(db)
        self.vehicle_service = VehicleService(db)
        self.driver_service = DriverService(db)

    async def compute_global_risk(self, speed: float, fatigue: float, visibility: float, traction: float) -> float:
        # Base safety heuristics for threat estimation
        risk = 0.0
        
        # 1. Fatigue Impact (0 to 1 scaling)
        risk += fatigue * 40.0 # max 40 points
        
        # 2. Speed risk (over 70 mph increases danger)
        if speed > 70:
            risk += min(20.0, (speed - 70) * 1.5)
            
        # 3. Weather / Visibility Impact (visibility under 5 miles raises risk)
        if visibility < 5:
            risk += (5 - visibility) * 4.0 # max 20 points
            
        # 4. Traction Coefficient Impact (lower traction increases risk)
        if traction < 1.0:
            risk += (1.0 - traction) * 20.0 # max 20 points
            
        return min(100.0, max(0.0, risk))

    async def fuse_context(self, trip_id: UUID, driver_id: UUID, vehicle_id: UUID) -> AIContext:
        # 1. Gather Telemetry
        latest_telemetry = await self.vehicle_service.get_latest_telemetry(vehicle_id)
        speed = latest_telemetry.speed if latest_telemetry else 0.0
        latitude = latest_telemetry.latitude if latest_telemetry else 0.0
        longitude = latest_telemetry.longitude if latest_telemetry else 0.0
        
        # 2. Gather Driver Fatigue State
        recent_behaviors = await self.driver_service.get_behavior_history(driver_id, limit=1)
        fatigue = recent_behaviors[0].fatigue_score if recent_behaviors else 0.0
        
        # 3. Gather Weather
        res = await self.db.execute(
            select(WeatherImpactLog)
            .order_by(WeatherImpactLog.recorded_at.desc())
            .limit(1)
        )
        weather = res.scalars().first()
        visibility = weather.visibility if weather else 10.0
        traction = weather.traction_rating if weather else 1.0
        road_cond = weather.condition if weather else "NORMAL"
        
        # 4. Synthesize Risk
        risk_score = await self.compute_global_risk(speed, fatigue, visibility, traction)
        
        # Active Agent States Summary
        agent_states = {
            "driver_agent": "ALERT" if fatigue < 0.4 else "FATIGUED",
            "vehicle_agent": "NORMAL" if speed < 80 else "SPEEDING",
            "safety_agent": "CRITICAL" if risk_score > 70 else ("WARNING" if risk_score > 40 else "SAFE"),
            "weather_agent": road_cond
        }
        
        # 5. Persist
        context_data = {
            "trip_id": trip_id,
            "driver_fatigue_score": fatigue,
            "road_condition": road_cond,
            "weather_severity": 10.0 - visibility,
            "global_risk_score": risk_score,
            "active_agent_states": agent_states
        }
        
        logger.info(f"Fusing Context for Trip {trip_id} | Global Risk Score: {risk_score:.2f}")
        return await self.repo.create(context_data)
