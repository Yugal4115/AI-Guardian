from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.settings.models import Settings
from app.modules.schemas import SettingsCreate

class SettingsService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_settings(self, owner_id: str, key: str) -> Settings | None:
        result = await self.db.execute(
            select(Settings).filter(Settings.owner_id == owner_id, Settings.key == key)
        )
        return result.scalars().first()

    async def save_settings(self, settings_in: SettingsCreate) -> Settings:
        existing = await self.get_settings(settings_in.owner_id, settings_in.key)
        if existing:
            existing.value = settings_in.value
            self.db.add(existing)
            return existing
            
        obj = Settings(**settings_in.model_dump())
        self.db.add(obj)
        await self.db.flush()
        return obj
