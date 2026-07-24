from typing import Generic, Type, TypeVar, List, Any, Dict
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update, delete
from app.modules.base_models import AuditModel

ModelType = TypeVar("ModelType", bound=AuditModel)

class BaseRepository(Generic[ModelType]):
    def __init__(self, model: Type[ModelType], db: AsyncSession):
        self.model = model
        self.db = db

    async def get(self, id: UUID) -> ModelType | None:
        result = await self.db.execute(
            select(self.model).filter(self.model.id == id, self.model.deleted_at.is_(None))
        )
        return result.scalars().first()

    async def get_multi(self, skip: int = 0, limit: int = 100) -> List[ModelType]:
        result = await self.db.execute(
            select(self.model)
            .filter(self.model.deleted_at.is_(None))
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())

    async def create(self, obj_in: Dict[str, Any]) -> ModelType:
        db_obj = self.model(**obj_in)
        self.db.add(db_obj)
        await self.db.flush()
        return db_obj

    async def update(self, db_obj: ModelType, obj_in: Dict[str, Any]) -> ModelType:
        for field in obj_in:
            if hasattr(db_obj, field):
                setattr(db_obj, field, obj_in[field])
        self.db.add(db_obj)
        await self.db.flush()
        return db_obj

    async def delete(self, id: UUID) -> bool:
        db_obj = await self.get(id)
        if db_obj:
            db_obj.delete() # Soft delete
            self.db.add(db_obj)
            await self.db.flush()
            return True
        return False
