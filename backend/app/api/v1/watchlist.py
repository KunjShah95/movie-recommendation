# app/api/v1/watchlist.py

from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select, delete

from app.api import deps
from app.db.session import get_db
from app.models.watchlist import Watchlist
from app.models.movie import Movie
from app.models.user import User
from app.schemas.response import MovieRecommendation

router = APIRouter()

@router.post("/{movie_id}", status_code=status.HTTP_201_CREATED)
def add_to_watchlist(
    movie_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    # Check if movie exists
    movie = db.get(Movie, movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    # Check if already in watchlist
    existing = db.execute(
        select(Watchlist).where(
            Watchlist.user_id == current_user.id,
            Watchlist.movie_id == movie_id
        )
    ).scalars().first()
    
    if existing:
        return {"message": "Already in watchlist"}
    
    db_obj = Watchlist(user_id=current_user.id, movie_id=movie_id)
    db.add(db_obj)
    db.commit()
    return {"message": "Added to watchlist"}

@router.delete("/{movie_id}")
def remove_from_watchlist(
    movie_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    stmt = delete(Watchlist).where(
        Watchlist.user_id == current_user.id,
        Watchlist.movie_id == movie_id
    )
    result = db.execute(stmt)
    db.commit()
    
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Not in watchlist")
    
    return {"message": "Removed from watchlist"}

@router.get("/", response_model=List[dict]) # Simplified for now
def get_watchlist(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    stmt = select(Watchlist).where(Watchlist.user_id == current_user.id)
    result = db.execute(stmt).scalars().all()
    
    # In a real app, you'd map these to MovieRecommendation schemas
    return [{"movie_id": item.movie_id, "title": item.movie.title} for item in result]
