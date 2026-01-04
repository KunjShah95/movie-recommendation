import httpx
from cachetools import TTLCache
from typing import Dict, Any, Optional, List
from app.core.config import get_settings
from app.core.logger import get_logger

settings = get_settings()
logger = get_logger(__name__)

class DataSyncService:
    """
    Handles data retrieval from TMDB, OMDb, and JustWatch.
    """
    
    def __init__(self):
        self.tmdb_base = "https://api.themoviedb.org/3"
        self.omdb_base = "http://www.omdbapi.com"
        # Persistence caches: 1 hour for general data, 24 hours for providers
        self.search_cache = TTLCache(maxsize=100, ttl=3600)
        self.details_cache = TTLCache(maxsize=100, ttl=3600)
        self.streaming_cache = TTLCache(maxsize=100, ttl=86400)

    async def search_tmdb_movies(self, query: str) -> List[Dict[str, Any]]:
        """Search for movies on TMDB."""
        if query in self.search_cache:
            return self.search_cache[query]

        if not settings.TMDB_API_KEY or "your_tmdb_api_key" in settings.TMDB_API_KEY:
            logger.warning("TMDB API key is missing or using placeholder.")
            return []
            
        try:
            # Setting verify=False sometimes helps on Windows if local certs are missing
            async with httpx.AsyncClient(verify=False) as client:
                url = f"{self.tmdb_base}/search/movie"
                params = {
                    "api_key": settings.TMDB_API_KEY,
                    "query": query,
                    "language": "en-US"
                }
                response = await client.get(url, params=params, timeout=20.0)
                response.raise_for_status()
                results = response.json().get("results", [])
                self.search_cache[query] = results
                return results
        except httpx.ConnectError:
            logger.error(f"❌ Connection Error: Could not reach TMDB. Try checking your internet or using a VPN.")
            return []
        except Exception as e:
            logger.error(f"❌ Error searching TMDB: {str(e)}")
            return []

    async def fetch_tmdb_details(self, movie_id: int) -> Dict[str, Any]:
        """Fetch full movie details from TMDB."""
        if movie_id in self.details_cache:
            return self.details_cache[movie_id]

        if not settings.TMDB_API_KEY:
            return {}
            
        try:
            async with httpx.AsyncClient(verify=False) as client:
                url = f"{self.tmdb_base}/movie/{movie_id}"
                params = {"api_key": settings.TMDB_API_KEY, "append_to_response": "credits,keywords"}
                response = await client.get(url, params=params, timeout=20.0)
                data = response.json()
                self.details_cache[movie_id] = data
                return data
        except Exception as e:
            logger.error(f"❌ Error fetching TMDB details: {str(e)}")
            return {}



    async def fetch_omdb_data(self, title: str) -> Dict[str, Any]:
        """Fetch ratings and awards from OMDb."""
        if not settings.OMDB_API_KEY:
            return {}
            
        async with httpx.AsyncClient() as client:
            params = {"t": title, "apikey": settings.OMDB_API_KEY}
            response = await client.get(self.omdb_base, params=params)
            return response.json()

    async def fetch_streaming_providers(self, movie_id: int) -> Dict[str, Any]:
        """Fetch streaming data (JustWatch integration via TMDB)."""
        if movie_id in self.streaming_cache:
            return self.streaming_cache[movie_id]

        if not settings.TMDB_API_KEY:
            return {}
            
        async with httpx.AsyncClient() as client:
            url = f"{self.tmdb_base}/movie/{movie_id}/watch/providers"
            params = {"api_key": settings.TMDB_API_KEY}
            response = await client.get(url, params=params)
            results = response.json().get("results", {})
            # Return US providers as default or empty
            provider_data = results.get("US", {})
            self.streaming_cache[movie_id] = provider_data
            return provider_data

    async def get_research_comparison(self, movie_id: int) -> Dict[str, Any]:
        """
        Mock for MovieLens / Research comparison data.
        In production, this would query a MovieLens dataset or a research endpoint.
        """
        return {
            "movielens_avg_rating": 4.1,
            "research_tags": ["cinematic", "classic", "complex characters"]
        }

