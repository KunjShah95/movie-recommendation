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
                self.model = genai.GenerativeModel('gemini-2.0-flash')
                self.enabled = True
                logger.info("Gemini Service initialized successfully.")
            except Exception as e:
                logger.error(f"Failed to initialize Gemini: {e}")

    async def generate_explanation(self, movie_title: str, user_mood: str, user_intent: str) -> str:
        if not self.enabled:
            return f"This movie is a great match for your {user_mood} mood!"

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
            return f"This movie really fits the vibe you're looking for right now!"

    async def generate_raw_text(self, prompt: str) -> str:
        if not self.enabled:
            return "Hey! I'm having some technical issues right now, but I'd love to help you find a great movie. What are you in the mood for?"
            
        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            logger.error(f"Gemini raw generation error: {e}")
            return "Oops, something went wrong on my end. Could you try asking that again?"

