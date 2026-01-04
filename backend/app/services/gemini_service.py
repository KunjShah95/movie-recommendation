import google.generativeai as genai
from app.core.config import get_settings
import logging

settings = get_settings()
logger = logging.getLogger(__name__)

class GeminiService:
    def __init__(self):
        self.enabled = False
        if settings.GOOGLE_API_KEY:
            try:
                genai.configure(api_key=settings.GOOGLE_API_KEY)
                self.model = genai.GenerativeModel('gemini-3-flash')
                self.enabled = True
                logger.info("Gemini Service initialized successfully.")
            except Exception as e:
                logger.error(f"Failed to initialize Gemini: {e}")

    async def generate_explanation(self, movie_title: str, user_mood: str, user_intent: str) -> str:
        if not self.enabled:
            return f"This movie perfectly matches your {user_mood} mood."

        prompt = f"""
        User is feeling: {user_mood}
        User intent: {user_intent}
        Movie recommended: {movie_title}
        
        Generate a one-sentence, highly personalized, empathetic reason why this movie is a great choice for them right now. 
        Focus on the emotional connection. Use a warm, human tone. Avoid generic AI phrases.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            logger.error(f"Gemini generation error: {e}")
            return f"The emotional arc of {movie_title} resonates deeply with your current state."
