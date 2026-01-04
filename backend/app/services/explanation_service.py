from typing import List, Dict, Any
from app.models.movie import Movie

class ExplanationService:
    def generate_reasoning(
        self,
        movie: Movie,
        mood: str,
        score_details: Dict[str, Any]
    ) -> str:
        """
        Generates a calm, empathetic reasoning for a recommendation.
        Rule: Never mention algorithms or scores.
        """
        tone_reason = ""
        if movie.tone == "uplifting":
            tone_reason = "its gentle and hopeful tone matches your current state perfectly."
        elif movie.tone == "heavy":
            tone_reason = "it offers a deep, reflective experience that respects your solemn mood."
        else:
            tone_reason = "it provides a balanced perspective for your afternoon."

        pace_reason = ""
        if movie.pace == "slow":
            pace_reason = "The deliberate, steady pace allows you to breathe and truly soak in the atmosphere."
        elif movie.pace == "fast":
            pace_reason = "The energetic rhythm will help you disconnect and find a new spark of excitement."

        return f"I've selected '{movie.title}' because {tone_reason} {pace_reason} It aligns with how you're feeling right now, offering a safe space to just... be."

    def generate_detailed_reasoning(
        self,
        movie: Movie,
        mood: str,
        score_details: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Generates structured reasoning for the UI.
        """
        paragraph = self.generate_reasoning(movie, mood, score_details)
        
        bullets = [
            f"Matches your preference for {movie.tone} storytelling",
            f"The {movie.pace} pace respects your current energy levels",
            "Offers an emotional journey that feels safe and grounded",
            "Selected specifically to avoid any emotionally heavy triggers"
        ]
        
        return {
            "paragraph": paragraph,
            "bullets": bullets
        }

    def generate_summary(self, mood: str, top_movies: List[str]) -> str:
        """
        Generates an overall summary of why these movies were picked.
        """
        return (
            f"Based on your feeling of '{mood}', I've curated a few stories that I believe will "
            "provide the comfort and engagement you're looking for. These selections were made with "
            "your emotional well-being as the highest priority."
        )


