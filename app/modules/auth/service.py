from datetime import timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.users.service import UserService
from app.core.security import verify_password, create_access_token
from app.exceptions import UnauthorizedException
from app.modules.schemas import Token

class AuthService:
    def __init__(self, db: AsyncSession):
        self.user_service = UserService(db)

    async def authenticate_user(self, email: str, password: str) -> Token:
        user = await self.user_service.get_by_email(email)
        if not user or not verify_password(password, user.hashed_password):
            raise UnauthorizedException("Incorrect email or password")
        
        if not user.is_active:
            raise UnauthorizedException("Inactive user account")
            
        access_token = create_access_token(subject=user.id)
        return Token(access_token=access_token, token_type="bearer")
