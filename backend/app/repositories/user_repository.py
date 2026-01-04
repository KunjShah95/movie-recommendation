# app/repositories/user_repository.py

from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.auth import get_password_hash

class UserRepository:
    @staticmethod
    def get_by_email(db: Session, email: str) -> Optional[User]:
        stmt = select(User).where(User.email == email)
        result = db.execute(stmt)
        return result.scalars().first()

    @staticmethod
    def get_by_id(db: Session, user_id: int) -> Optional[User]:
        stmt = select(User).where(User.id == user_id)
        result = db.execute(stmt)
        return result.scalars().first()

    @staticmethod
    def create(db: Session, obj_in: UserCreate) -> User:
        db_obj = User(
            email=obj_in.email,
            hashed_password=get_password_hash(obj_in.password),
            full_name=obj_in.full_name,
            is_active=True,
            is_superuser=False
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    @staticmethod
    def update(db: Session, db_obj: User, obj_in: UserUpdate) -> User:
        if obj_in.email:
            db_obj.email = obj_in.email
        if obj_in.full_name:
            db_obj.full_name = obj_in.full_name
        if obj_in.password:
            db_obj.hashed_password = get_password_hash(obj_in.password)
        
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
