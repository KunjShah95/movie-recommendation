from pydantic import BaseModel
from typing import List, Optional

class RecommendationRequest(BaseModel):
    mood: str
    intent: Optional[str] = None
    personality: Optional[str] = None
    context: Optional[dict] = None
