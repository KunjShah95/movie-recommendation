from typing import Optional

class IntentService:
    def map_intent_to_genre(self, intent: str) -> str:
        intent_map = {
            "relax": "Drama",
            "inspire": "Biography",
            "escape": "Sci-Fi",
            "learn": "Documentary",
            "social": "Comedy"
        }
        return intent_map.get(intent.lower(), "Drama")

