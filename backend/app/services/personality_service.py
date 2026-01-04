from typing import Optional

class PersonalityService:
    def adjust_for_personality(self, personality: Optional[str]) -> dict:
        """
        Adjusts weights or filters based on user's deep persona.
        """
        if personality == "cinephile":
            return {"diversity_bonus": 0.2, "runtime_penalty": 0.0}
        return {"diversity_bonus": 0.0, "runtime_penalty": 0.1}

