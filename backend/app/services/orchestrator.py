from fastapi import Depends
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.schemas.request import RecommendationRequest
from app.schemas.response import RecommendationResponse, MovieRecommendation
from app.repositories.movie_repository import MovieRepository
from app.services.emotion_service import EmotionService
from app.services.intent_service import IntentService
from app.services.context_service import ContextService
from app.services.arc_service import ArcService
from app.services.scoring_service import ScoringService
from app.services.explanation_service import ExplanationService
from app.services.gemini_service import GeminiService
from app.core.logger import get_logger

logger = get_logger(__name__)

class RecommendationOrchestrator:
    def __init__(
        self,
        db: Session = Depends(get_db),
        emotion_service: EmotionService = Depends(),
        intent_service: IntentService = Depends(),
        context_service: ContextService = Depends(),
        arc_service: ArcService = Depends(),
        scoring_service: ScoringService = Depends(),
        explanation_service: ExplanationService = Depends(),
        gemini_service: GeminiService = Depends()
    ):
        self.db = db
        self.emotion_service = emotion_service
        self.intent_service = intent_service
        self.context_service = context_service
        self.arc_service = arc_service
        self.scoring_service = scoring_service
        self.explanation_service = explanation_service
        self.gemini_service = gemini_service

    async def get_recommendations(self, request: RecommendationRequest) -> RecommendationResponse:
        logger.info(f"Processing recommendation for mood: {request.mood}")

        # 1. Emotional Safety Filter
        # If user is anxious/vulnerable, we filter out heavy content immediately
        safety_constraints = self.emotion_service.get_safety_filters(request.mood)
        
        # 2. Contextual Constraints
        # Time of day, max runtime, etc.
        context_constraints = self.context_service.get_constraints(request.context)
        
        # Combine filters
        candidates = MovieRepository.filter_by_constraints(
            self.db,
            max_runtime=context_constraints.get("max_runtime"),
            tone=safety_constraints.get("tone_limit"),
            pace=request.context.get("pace") if request.context else None
        )

        if not candidates:
            # Fallback if filters are too strict
            candidates = MovieRepository.get_all(self.db)[:20]

        # 3. Scoring / Alignment
        # Instead of raw accuracy, we align with the user's current state
        scored_candidates = []
        for movie in candidates:
            score_details = self.scoring_service.calculate_alignment(
                movie=movie,
                mood=request.mood,
                intent=request.intent,
                personality=request.personality
            )
            scored_candidates.append((movie, score_details))

        # Sort by alignment score
        scored_candidates.sort(key=lambda x: x[1]["total_score"], reverse=True)
        top_candidates = scored_candidates[:3]

        # 4. Human-Centric Explanation Generation
        recommendations = []
        for movie, score_details in top_candidates:
            reasoning_data = self.explanation_service.generate_detailed_reasoning(
                movie=movie,
                mood=request.mood,
                score_details=score_details
            )
            
            # AI Personalized Reasoning
            ai_reason = await self.gemini_service.generate_explanation(
                movie_title=movie.title,
                user_mood=request.mood,
                user_intent=request.intent or "watch something good"
            )
            
            recommendations.append(MovieRecommendation(
                id=movie.id,
                title=movie.title,
                year=movie.release_year or 2024,
                poster=f"https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&h=1200&fit=crop", 
                backdrop=movie.backdrop_url or "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200",
                type=movie.content_type or "movie",
                emotionalTag=movie.tone.capitalize() if movie.tone else "Balanced",
                emotionalArc=" -> ".join(movie.emotional_arc) if movie.emotional_arc else "Steady journey",
                trailerUrl=movie.trailer_url,
                streamingPlatforms=movie.streaming_platforms or [],
                reasons=reasoning_data["bullets"],
                reasoning=ai_reason if self.gemini_service.enabled else reasoning_data["paragraph"]
            ))

        overall_explanation = self.explanation_service.generate_summary(
            mood=request.mood,
            top_movies=[m.title for m in recommendations]
        )

        return RecommendationResponse(
            recommendations=recommendations,
            explanation=overall_explanation
        )


