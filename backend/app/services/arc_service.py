from typing import List
from app.models.movie import Movie

class ArcService:
    def analyze_arc(self, movie: Movie) -> List[str]:
        """
        Returns the emotional progression of the movie.
        Example: ["calm", "conflict", "hopeful"]
        """
        return movie.emotional_arc or ["stable"]

