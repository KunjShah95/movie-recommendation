from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.research_service import ResearchService
from app.schemas.response import MovieRecommendation
from pydantic import BaseModel

router = APIRouter()
research_service = ResearchService()

class ResearchRequest(BaseModel):
    title: str

@router.post("/research")
async def research_movie(request: ResearchRequest, db: Session = Depends(get_db)):
    """
    Acts as a 'Deep Search' - researches a movie title, 
    analyzes it, and returns the cinematic profile.
    """
    movie = await research_service.discover_movie(request.title, db)
    
    if not movie:
        raise HTTPException(
            status_code=404, 
            detail="My cinematic sensors couldn't find enough deep data on this title yet. Try a more well-known movie!"
        )
    
    return MovieRecommendation(
        id=movie.id,
        title=movie.title,
        year=2023, # Simplified for demo
        poster="https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&h=1200&fit=crop", 
        emotionalTag=movie.tone.capitalize(),
        emotionalArc=" -> ".join(movie.emotional_arc),
        reasons=[
            f"Analyzed specifically for your request",
            f"Determined to be {movie.tone} and {movie.pace} paced",
            "Added to our cinematic collective for future mapping"
        ],
        reasoning=f"I've performed a deep scan of '{movie.title}'. My analysis reveals a story that is primarily {movie.tone} in tone with a {movie.pace} pace, offering a journey through {', '.join(movie.emotional_arc)}."
    )
