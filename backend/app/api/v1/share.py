from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.share import Share
from app.repositories.share_repository import ShareRepository
from app.repositories.movie_repository import MovieRepository
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

router = APIRouter()

class ShareCreate(BaseModel):
    mood: str
    intent: Optional[str] = None
    personality: Optional[str] = None
    context: Optional[Dict[str, Any]] = None
    movie_ids: List[int]

class ShareResponse(BaseModel):
    share_id: str
    url: str

@router.post("/", response_model=ShareResponse)
async def create_share(request: ShareCreate, db: Session = Depends(get_db)):
    share = Share(
        mood=request.mood,
        intent=request.intent,
        personality=request.personality,
        context=request.context,
        movie_ids=request.movie_ids
    )
    saved_share = ShareRepository.create(db, share)
    return {
        "share_id": saved_share.id,
        "url": f"/share/{saved_share.id}"
    }

@router.get("/{share_id}")
async def get_share(share_id: str, db: Session = Depends(get_db)):
    share = ShareRepository.get_by_id(db, share_id)
    if not share:
        raise HTTPException(status_code=404, detail="Share not found")
    
    # Fetch movies associated with this share
    movies = []
    for mid in share.movie_ids:
        movie = MovieRepository.get_by_id(db, mid)
        if movie:
            movies.append(movie)
            
    return {
        "mood": share.mood,
        "intent": share.intent,
        "personality": share.personality,
        "context": share.context,
        "movies": movies
    }
