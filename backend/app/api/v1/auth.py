# app/api/v1/auth.py

from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core import auth
from app.core.config import get_settings
from app.db.session import get_db
from app.schemas import user as user_schema
from app.repositories.user_repository import UserRepository

router = APIRouter()
settings = get_settings()

@router.post("/login/access-token", response_model=user_schema.Token)
def login_access_token(
    db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    user = UserRepository.get_by_email(db, email=form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )
    elif not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user",
        )
    
    access_token_expires = timedelta(minutes=60 * 24 * 8)
    return {
        "access_token": auth.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }

@router.post("/signup", response_model=user_schema.User)
def create_user(
    *,
    db: Session = Depends(get_db),
    user_in: user_schema.UserCreate,
) -> Any:
    user = UserRepository.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The user with this email already exists in the system.",
        )
    user = UserRepository.create(db, obj_in=user_in)
    return user
