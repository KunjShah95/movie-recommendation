from typing import Dict, Any

class EmotionService:
    def get_safety_filters(self, mood: str) -> Dict[str, Any]:
        """
        Rule: Never recommend emotionally heavy or disturbing content
        if the user expresses fatigue, anxiety, or vulnerability.
        """
        vulnerable_moods = {"fatigue", "anxiety", "stress", "sadness", "vulnerability"}
        
        if mood.lower() in vulnerable_moods:
            return {
                "tone_limit": "uplifting",
                "max_intensity": 0.4,
                "exclude_genres": ["Horror", "Tragedy", "Dark Thriller"]
            }
            
        return {
            "tone_limit": None,
            "max_intensity": 1.0,
            "exclude_genres": []
        }

