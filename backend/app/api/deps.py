# app/api/deps.py

from typing import Generator
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.core import auth
from app.core.config import get_settings
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import TokenData
from app.repositories.user_repository import UserRepository

settings = get_settings()
reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login/access-token"
)

def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(reusable_oauth2)
) -> User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[auth.ALGORITHM]
        )
        token_data = TokenData(email=payload.get("sub"))
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = UserRepository.get_by_id(db, user_id=int(token_data.email))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
