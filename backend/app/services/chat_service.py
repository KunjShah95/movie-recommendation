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
        system_prompt = """You are a friendly movie and TV series recommendation assistant called "CinePulse Assistant".

IMPORTANT RULES:
1. ONLY respond to questions about movies, TV series, web series, and related topics (actors, directors, genres, streaming platforms, etc.)
2. If someone asks about anything unrelated to movies/series (like coding, weather, politics, etc.), politely redirect them by saying: "Hey! I'm here to help you discover great movies and shows. What kind of movie or series are you in the mood for today?"
3. Keep your responses short, casual, and easy to understand - like chatting with a friend who loves movies
4. Avoid overly dramatic or poetic language - be natural and helpful
5. When recommending movies, wrap titles in [[Title]] format so the system can fetch more details
6. Give practical recommendations based on what the user actually wants

RESPONSE STYLE:
- Be warm and conversational, not robotic
- Use simple, everyday language
- Keep answers concise (2-4 sentences usually)
- If recommending movies, briefly explain WHY they'd enjoy it
- It's okay to ask clarifying questions to give better recommendations

User context: """ + str(context or "No specific context.")
        
        # Convert messages to Gemini format (if needed, or pass as custom prompt)
        # For simplicity, we'll build a prompt from the history
        prompt_parts = [system_prompt]
        for msg in messages:
            role = "User: " if msg['role'] == 'user' else "Assistant: "
            prompt_parts.append(f"{role}{msg['content']}")
        
        prompt_parts.append("Assistant: ")
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
