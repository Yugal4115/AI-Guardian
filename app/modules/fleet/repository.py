from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.base_repository import BaseRepository
from app.modules.fleet.models import Fleet

class FleetRepository(BaseRepository[Fleet]):
    def __init__(self, db: AsyncSession):
        super().__init__(Fleet, db)

    async def get_by_name(self, name: str) -> Fleet | None:
        result = await self.db.execute(
            select(Fleet).filter(Fleet.name == name, Fleet.deleted_at.is_(None))
        )
        return result.scalars().first()
