from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.base_repository import BaseRepository
from app.modules.users.models import User

class UserRepository(BaseRepository[User]):
    def __init__(self, db: AsyncSession):
        super().__init__(User, db)

    async def get_by_email(self, email: str) -> User | None:
        result = await self.db.execute(
            select(User).filter(User.email == email, User.deleted_at.is_(None))
        )
        return result.scalars().first()
