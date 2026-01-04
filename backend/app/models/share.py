from sqlalchemy import Column, Integer, String, JSON, DateTime
from sqlalchemy.sql import func
from app.db.base import Base
import uuid

class Share(Base):
    __tablename__ = "shares"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    mood = Column(String, nullable=False)
    intent = Column(String, nullable=True)
    personality = Column(String, nullable=True)
    context = Column(JSON, nullable=True)
    movie_ids = Column(JSON, nullable=False) # List of movie IDs recommended
    created_at = Column(DateTime(timezone=True), server_default=func.now())
