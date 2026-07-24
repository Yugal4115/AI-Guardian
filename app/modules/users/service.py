from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.users.repository import UserRepository
from app.modules.schemas import UserCreate
from app.core.security import get_password_hash
from app.exceptions import ConflictException, NotFoundException
from app.modules.users.models import User

class UserService:
    def __init__(self, db: AsyncSession):
        self.repo = UserRepository(db)

    async def get_user(self, user_id: UUID) -> User:
        user = await self.repo.get(user_id)
        if not user:
            raise NotFoundException("User not found")
        return user

    async def get_by_email(self, email: str) -> User | None:
        return await self.repo.get_by_email(email)

    async def create_user(self, user_in: UserCreate) -> User:
        existing = await self.repo.get_by_email(user_in.email)
        if existing:
            raise ConflictException("Email is already registered")
        
        hashed_password = get_password_hash(user_in.password)
        data = user_in.model_dump(exclude={"password"})
        data["hashed_password"] = hashed_password
        
        return await self.repo.create(data)

    async def list_users(self, skip: int = 0, limit: int = 100):
        return await self.repo.get_multi(skip=skip, limit=limit)
