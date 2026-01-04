from fastapi import APIRouter, Depends
from app.schemas.request import RecommendationRequest
from app.schemas.response import RecommendationResponse
from app.services.orchestrator import RecommendationOrchestrator

router = APIRouter()

@router.post("/", response_model=RecommendationResponse)
async def get_recommendation(
    request: RecommendationRequest,
    orchestrator: RecommendationOrchestrator = Depends()
):
    return await orchestrator.get_recommendations(request)
