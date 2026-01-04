# app/models/watchlist.py

from sqlalchemy import Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class Watchlist(Base):
    __tablename__ = "watchlist"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False)
    movie_id: Mapped[int] = mapped_column(Integer, ForeignKey("movies.id"), nullable=False)

    # Relationship to get movie details easily
    movie = relationship("Movie")
    
    __table_args__ = (
        UniqueConstraint("user_id", "movie_id", name="uq_user_movie"),
    )
