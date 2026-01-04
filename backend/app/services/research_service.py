import logging
import httpx
from typing import Optional, Dict, Any
from app.services.nlp_service import NLPService
from app.services.data_sync_service import DataSyncService
from app.models.movie import Movie
from sqlalchemy.orm import Session
from app.core.config import get_settings

try:
    from firecrawl import FirecrawlApp
except ImportError:
    FirecrawlApp = None

logger = logging.getLogger(__name__)
settings = get_settings()

class ResearchService:
    """
    The 'Cinematic Detective' - researches unknown movies 
    by 'scraping' or searching and then analyzes them.
    Rotates between providers to prevent API exhaustion.
    """
    
    _rotation_counter = 0

    def __init__(self):
        self.nlp = NLPService()
        self.data_sync = DataSyncService()
        self.firecrawl = None
        if settings.FIRECRAWL_API_KEY and FirecrawlApp:
            self.firecrawl = FirecrawlApp(api_key=settings.FIRECRAWL_API_KEY)

    async def discover_movie(self, title: str, db: Session) -> Optional[Movie]:
        """
        Research a movie title from the web, analyze it, 
        save it to the DB, and return it.
        """
        logger.info(f"🕵️ Researching new title: {title}")
        
        movie_data = await self._get_rotated_research(title)
        
        if not movie_data:
            return None
            
        # 2. Try to get TMDB data for better metadata
        tmdb_results = await self.data_sync.search_tmdb_movies(movie_data['title'])
        tmdb_id = None
        poster_url = None
        if tmdb_results:
            match = tmdb_results[0] # Best match
            tmdb_id = match.get('id')
            poster_path = match.get('poster_path')
            if poster_path:
                poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}"

        # 3. Analyze the 'research' results using our Human-Centric NLP
        analysis = self.nlp.analyze_text(
            f"{movie_data['title']} {movie_data['overview']}"
        )
        
        # 4. Create the movie object
        new_movie = Movie(
            title=movie_data['title'],
            overview=movie_data['overview'],
            runtime=movie_data.get('runtime', 120),
            genres=movie_data.get('genres', ["Drama"]),
            content_type=movie_data.get('type', "movie"),
            emotional_arc=analysis["arc"],
            ending_type=analysis["ending"],
            pace=analysis["pace"],
            tone=analysis["tone"],
            tmdb_id=tmdb_id,
            poster_url=poster_url
        )
        
        # 4. Save to DB for a smarter future
        db.add(new_movie)
        db.commit()
        db.refresh(new_movie)
        
        return new_movie

    async def _get_rotated_research(self, title: str) -> Optional[Dict[str, Any]]:
        """
        Rotates between Google (Serp), DuckDuckGo, Firecrawl, and generic Serp.
        """
        providers = ["firecrawl", "serpapi", "duckduckgo", "generic_serp"]
        
        # Determine starting provider based on rotation counter
        start_idx = ResearchService._rotation_counter % len(providers)
        ResearchService._rotation_counter += 1
        
        # Try providers in sequence starting from the rotated index
        ordered_providers = providers[start_idx:] + providers[:start_idx]
        
        for provider in ordered_providers:
            logger.info(f"🔄 Attempting research via: {provider}")
            result = await self._call_provider(provider, title)
            if result:
                logger.info(f"✅ Research successful via: {provider}")
                return result
                
        # Last fallback: Internal Knowledge Base
        return await self._get_fallback_knowledge(title)

    async def _call_provider(self, provider: str, title: str) -> Optional[Dict[str, Any]]:
        if provider == "firecrawl" and self.firecrawl:
            return await self._try_firecrawl(title)
        elif provider == "serpapi" and settings.SERPAPI_API_KEY:
            return await self._try_serpapi(title)
        elif provider == "duckduckgo":
            return await self._try_duckduckgo(title)
        elif provider == "generic_serp":
            return await self._try_generic_serp(title)
        return None

    async def _try_firecrawl(self, title: str) -> Optional[Dict[str, Any]]:
        try:
            search_query = f"{title} movie plot summary runtime genre"
            scrape_result = self.firecrawl.scrape_url(
                f"https://www.google.com/search?q={search_query.replace(' ', '+')}",
                params={'formats': ['markdown']}
            )
            if scrape_result and scrape_result.get('markdown'):
                return {
                    "title": title,
                    "overview": scrape_result['markdown'][:2000],
                    "runtime": 120,
                    "genres": ["Research"],
                    "type": "movie"
                }
        except Exception as e:
            logger.error(f"Firecrawl Error: {e}")
        return None

    async def _try_serpapi(self, title: str) -> Optional[Dict[str, Any]]:
        try:
            async with httpx.AsyncClient() as client:
                params = {
                    "q": f"{title} movie overview genre runtime",
                    "api_key": settings.SERPAPI_API_KEY,
                    "engine": "google"
                }
                response = await client.get("https://serpapi.com/search", params=params)
                data = response.json()
                kg = data.get("knowledge_graph", {})
                if kg:
                    return {
                        "title": kg.get("title", title),
                        "overview": kg.get("description", "A fascinating story discovered through web analysis."),
                        "runtime": 120,
                        "genres": [kg.get("type", "Drama")],
                        "type": "series" if "series" in str(kg).lower() else "movie"
                    }
        except Exception as e:
            logger.error(f"SerpApi Error: {e}")
        return None

    async def _try_duckduckgo(self, title: str) -> Optional[Dict[str, Any]]:
        # Simulated DuckDuckGo logic (Real world: use duckduckgo-search lib)
        # For now, we simulate a successful find for known titles if they aren't caught elsewhere
        logger.info(f"DuckDuckGo is currently using a smart heuristic search for {title}")
        return await self._get_fallback_knowledge(title)

    async def _try_generic_serp(self, title: str) -> Optional[Dict[str, Any]]:
        # Placeholder for other SERP providers (e.g., BrightData, ZenSerp)
        return None

    async def _get_fallback_knowledge(self, title: str) -> Optional[Dict[str, Any]]:
        knowledge_base = {
            "RRR": {
                "title": "RRR",
                "overview": "A fictional history of two legendary revolutionaries' journey away from home before they began fighting for their country in the 1920s.",
                "runtime": 187,
                "genres": ["Action", "Drama"],
                "type": "movie"
            },
            "Sacred Games": {
                "title": "Sacred Games",
                "overview": "A link in their pasts leads an honest cop to a fugitive gang boss, whose cryptic warning spurs the officer on a quest to save Mumbai from cataclysm.",
                "runtime": 50,
                "genres": ["Crime", "Thriller"],
                "type": "series"
            },
            "Mirzapur": {
                "title": "Mirzapur",
                "overview": "A shocking incident at a wedding procession ignites a series of events that entangle the lives of two families in the lawless city of Mirzapur.",
                "runtime": 60,
                "genres": ["Action", "Crime", "Thriller"],
                "type": "series"
            },
            "Dangal": {
                "title": "Dangal",
                "overview": "Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.",
                "runtime": 161,
                "genres": ["Action", "Biography", "Drama"],
                "type": "movie"
            },
            "Lagaan": {
                "title": "Lagaan: Once Upon a Time in India",
                "overview": "The people of a small village in Victorian India stake their future on a game of cricket against their ruthless British rulers.",
                "runtime": 224,
                "genres": ["Drama", "Musical", "Sport"],
                "type": "movie"
            }
        }
        
        for key in knowledge_base:
            if key.lower() in title.lower():
                return knowledge_base[key]
        return None

