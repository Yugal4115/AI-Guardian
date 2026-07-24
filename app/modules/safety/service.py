from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.safety.models import SafetyRisk, NearMissIncident
from app.modules.schemas import SafetyRiskCreate

class SafetyService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def log_risk(self, risk_in: SafetyRiskCreate) -> SafetyRisk:
        db_obj = SafetyRisk(**risk_in.model_dump())
        self.db.add(db_obj)
        await self.db.flush()
        return db_obj

    async def get_latest_risks(self, vehicle_id: UUID, limit: int = 10):
        result = await self.db.execute(
            select(SafetyRisk)
            .filter(SafetyRisk.vehicle_id == vehicle_id)
            .order_by(SafetyRisk.recorded_at.desc())
            .limit(limit)
        )
        return list(result.scalars().all())

    async def record_near_miss(self, vehicle_id: UUID, severity: float, description: str) -> NearMissIncident:
        db_obj = NearMissIncident(
            vehicle_id=vehicle_id,
            severity_score=severity,
            description=description
        )
        self.db.add(db_obj)
        await self.db.flush()
        return db_obj
