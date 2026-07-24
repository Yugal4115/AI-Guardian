from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.weather.models import WeatherImpactLog
from app.modules.schemas import WeatherImpactLogCreate

class WeatherService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def log_weather(self, weather_in: WeatherImpactLogCreate) -> WeatherImpactLog:
        db_obj = WeatherImpactLog(**weather_in.model_dump())
        self.db.add(db_obj)
        await self.db.flush()
        return db_obj

    async def get_latest_weather(self) -> WeatherImpactLog | None:
        result = await self.db.execute(
            select(WeatherImpactLog).order_by(WeatherImpactLog.recorded_at.desc())
        )
        return result.scalars().first()
