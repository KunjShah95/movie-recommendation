# app/services/chat_service.py

import json
from typing import List, Dict, Any, Optional
from app.services.gemini_service import GeminiService
from app.services.data_sync_service import DataSyncService
from app.core.logger import get_logger

logger = get_logger(__name__)

class ChatService:
    def __init__(self):
        self.gemini = GeminiService()
        self.data_sync = DataSyncService()
        
    async def get_chat_response(self, messages: List[Dict[str, str]], context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Processes a chat conversation and returns a cinematic response.
        Also attempts to extract and enrich movie mentions.
        """
        system_prompt = (
            "You are the 'Cinematic Archivist', a sophisticated AI that helps users find movies "
            "based on deep emotional resonance, cinematic style, and mood. "
            "Be elegant, passionate about cinema, and slightly mysterious. "
            "If the user asks for a recommendation or discusses a movie, provide deep insights. "
            "If you mention specific movies, always wrap them in [[Title]] for extraction. "
            "Context about the user: " + str(context or "No specific context.")
        )
        
        # Convert messages to Gemini format (if needed, or pass as custom prompt)
        # For simplicity, we'll build a prompt from the history
        prompt_parts = [system_prompt]
        for msg in messages:
            role = "User: " if msg['role'] == 'user' else "Archivist: "
            prompt_parts.append(f"{role}{msg['content']}")
        
        prompt_parts.append("Archivist: ")
        full_prompt = "\n".join(prompt_parts)
        
        response_text = await self.gemini.generate_raw_text(full_prompt)
        
        # Extract movies wrapped in [[Title]]
        import re
        movie_titles = re.findall(r'\[\[(.*?)\]\]', response_text)
        
        suggested_movies = []
        for title in list(set(movie_titles))[:3]: # Limit to 3 enriched movies
            results = await self.data_sync.search_tmdb_movies(title)
            if results:
                match = results[0]
                suggested_movies.append({
                    "id": match.get('id'),
                    "title": match.get('title'),
                    "poster": f"https://image.tmdb.org/t/p/w200{match.get('poster_path')}" if match.get('poster_path') else None,
                    "year": match.get('release_date', '').split('-')[0] if match.get('release_date') else None
                })
        
        return {
            "message": {"role": "assistant", "content": response_text},
            "suggested_movies": suggested_movies
        }
