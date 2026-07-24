from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.core.dependencies import get_current_user, RoleChecker
from app.modules.users.service import UserService
from app.modules.schemas import UserCreate, UserResponse

router = APIRouter(tags=["Users"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(
    user_in: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    service = UserService(db)
    return await service.create_user(user_in)

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(
    current_user = Depends(get_current_user)
):
    return current_user

@router.get("/", response_model=List[UserResponse])
async def list_all_users(
    skip: int = 0,
    limit: int = 100,
    current_user = Depends(RoleChecker(["ADMIN", "FLEET_MANAGER"])),
    db: AsyncSession = Depends(get_db)
):
    service = UserService(db)
    return await service.list_users(skip=skip, limit=limit)
