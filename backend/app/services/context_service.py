from typing import Dict, Any, Optional

class ContextService:
    def get_constraints(self, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Calculates constraints based on time of day, device, or companions.
        """
        if not context:
            return {"max_runtime": 180}
            
        constraints = {}
        
        # Rule: If it's night, suggest shorter or more relaxing films
        time_of_day = context.get("time_of_day")
        if time_of_day == "night":
            constraints["max_runtime"] = 120
            constraints["preferred_pace"] = "slow"
        else:
            constraints["max_runtime"] = context.get("max_runtime", 180)
            
        return constraints

