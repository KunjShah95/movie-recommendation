# app/models/movie.py

from sqlalchemy import String, Integer, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base


class Movie(Base):
    __tablename__ = "movies"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True
    )

    title: Mapped[str] = mapped_column(
        String(255), nullable=False, index=True
    )

    content_type: Mapped[str] = mapped_column(
        String(20), nullable=False, default="movie"
        # movie | series
    )

    overview: Mapped[str] = mapped_column(
        String, nullable=False
    )

    release_year: Mapped[int] = mapped_column(
        Integer, nullable=True, default=2024
    )

    runtime: Mapped[int] = mapped_column(
        Integer, nullable=True
    )

    trailer_url: Mapped[str] = mapped_column(
        String, nullable=True
    )

    streaming_platforms: Mapped[list] = mapped_column(
        JSON, nullable=True # List of {name: str, icon: str, url: str}
    )

    backdrop_url: Mapped[str] = mapped_column(
        String, nullable=True
    )

    genres: Mapped[list] = mapped_column(
        JSON, nullable=False
    )

    # --- AI / REASONING FIELDS ---

    emotional_arc: Mapped[list] = mapped_column(
        JSON, nullable=False
        # Example: ["calm", "conflict", "hopeful"]
    )

    ending_type: Mapped[str] = mapped_column(
        String(50), nullable=False
        # hopeful | neutral | bittersweet
    )

    pace: Mapped[str] = mapped_column(
        String(50), nullable=False
        # slow | medium | fast
    )

    tone: Mapped[str] = mapped_column(
        String(50), nullable=False
        # uplifting | heavy | neutral
    )
