from pydantic import BaseModel
from typing import List, Optional

class MovieRecommendation(BaseModel):
    id: int
    title: str
    year: Optional[int] = None
    poster: Optional[str] = None
    backdrop: Optional[str] = None
    emotionalTag: Optional[str] = None
    emotionalArc: Optional[str] = None
    type: str = "movie"
    trailerUrl: Optional[str] = None
    streamingPlatforms: List[dict] = []
    reasons: List[str]
    reasoning: str # Keep for backward compat or detailed text

class RecommendationResponse(BaseModel):
    recommendations: List[MovieRecommendation]
    explanation: str

