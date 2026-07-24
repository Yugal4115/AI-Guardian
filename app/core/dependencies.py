from typing import List
from fastapi import Depends, Security
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.config import settings
from app.database import get_db
from app.exceptions import UnauthorizedException, ForbiddenException
from app.core.security import decode_access_token

# Token URL corresponds to authorization route
reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login"
)

async def get_current_user(
    db: AsyncSession = Depends(get_db),
    token: str = Depends(reusable_oauth2)
):
    token_data = decode_access_token(token)
    if not token_data:
        raise UnauthorizedException("Could not validate credentials")
    
    user_id = token_data.get("sub")
    if not user_id:
        raise UnauthorizedException("Invalid token payload")
    
    # Import locally to avoid circular dependency
    from app.modules.users.models import User
    
    result = await db.execute(select(User).filter(User.id == user_id, User.deleted_at.is_(None)))
    user = result.scalars().first()
    if not user:
        raise UnauthorizedException("User not found")
    if not user.is_active:
        raise ForbiddenException("User account is inactive")
        
    return user

class RoleChecker:
    def __init__(self, allowed_roles: List[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, current_user = Depends(get_current_user)):
        if current_user.role not in self.allowed_roles:
            raise ForbiddenException(
                f"Role '{current_user.role}' is not authorized to access this resource. Allowed: {self.allowed_roles}"
            )
        return current_user
