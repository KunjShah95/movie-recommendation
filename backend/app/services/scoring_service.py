from typing import Dict, Any, Optional
from app.models.movie import Movie
from app.core.config import get_settings

settings = get_settings()

class ScoringService:
    def calculate_alignment(
        self,
        movie: Movie,
        mood: str,
        intent: Optional[str] = None,
        personality: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Calculates how well a movie aligns with the user's signals.
        Returns a breakdown of scores.
        """
        emotion_score = self._score_emotion(movie, mood)
        intent_score = self._score_intent(movie, intent)
        
        total_score = (
            (emotion_score * settings.EMOTION_WEIGHT) +
            (intent_score * settings.INTENT_WEIGHT)
        )
        
        return {
            "total_score": total_score,
            "emotion_alignment": emotion_score,
            "intent_alignment": intent_score
        }

    def _score_emotion(self, movie: Movie, mood: str) -> float:
        # Simple heuristic: how well the movie's tone matches the requested mood
        # In a real app, this would use a more complex mapping
        tone_map = {
            "happy": "uplifting",
            "sad": "heavy",
            "anxious": "uplifting", # Complementary tone
            "bored": "dynamic"
        }
        
        target_tone = tone_map.get(mood.lower(), "neutral")
        if movie.tone == target_tone:
            return 1.0
        return 0.5

    def _score_intent(self, movie: Movie, intent: Optional[str]) -> float:
        if not intent:
            return 1.0
            
        intent_pace_map = {
            "relax": "slow",
            "inspire": "medium",
            "escape": "fast"
        }
        
        target_pace = intent_pace_map.get(intent.lower())
        if movie.pace == target_pace:
            return 1.0
        return 0.5

