# app/repositories/movie_repository.py

from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.models.movie import Movie


class MovieRepository:
    """
    Handles all database interactions related to Movie entities.
    """

    @staticmethod
    def get_all(db: Session) -> List[Movie]:
        """
        Fetch all movies from the database.
        """
        stmt = select(Movie)
        result = db.execute(stmt)
        return result.scalars().all()

    @staticmethod
    def get_by_id(db: Session, movie_id: int) -> Optional[Movie]:
        """
        Fetch a single movie by its ID.
        """
        stmt = select(Movie).where(Movie.id == movie_id)
        result = db.execute(stmt)
        return result.scalars().first()

    @staticmethod
    def search_by_title(
        db: Session,
        query: str,
        limit: int = 10
    ) -> List[Movie]:
        """
        Search movies by title (case-insensitive).
        """
        stmt = (
            select(Movie)
            .where(Movie.title.ilike(f"%{query}%"))
            .limit(limit)
        )
        result = db.execute(stmt)
        return result.scalars().all()

    @staticmethod
    def filter_by_constraints(
        db: Session,
        *,
        max_runtime: Optional[int] = None,
        pace: Optional[str] = None,
        ending_type: Optional[str] = None,
        tone: Optional[str] = None
    ) -> List[Movie]:
        """
        Filter movies using hard constraints BEFORE scoring.
        Used for context & personality filtering.
        """
        stmt = select(Movie)

        if max_runtime is not None:
            stmt = stmt.where(Movie.runtime <= max_runtime)

        if pace is not None:
            stmt = stmt.where(Movie.pace == pace)

        if ending_type is not None:
            stmt = stmt.where(Movie.ending_type == ending_type)

        if tone is not None:
            stmt = stmt.where(Movie.tone == tone)

        result = db.execute(stmt)
        return result.scalars().all()

    @staticmethod
    def get_by_tmdb_id(db: Session, tmdb_id: int) -> Optional[Movie]:
        stmt = select(Movie).where(Movie.tmdb_id == tmdb_id)
        result = db.execute(stmt)
        return result.scalars().first()

    @staticmethod
    def save(db: Session, movie: Movie) -> Movie:
        db.add(movie)
        db.commit()
        db.refresh(movie)
        return movie

