# backend/scripts/sync_tmdb.py

import asyncio
import logging
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.movie import Movie
from app.services.data_sync_service import DataSyncService
from app.core.config import get_settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
settings = get_settings()

async def sync_all_movies():
    db: Session = SessionLocal()
    data_sync = DataSyncService()
    
    try:
        movies = db.query(Movie).filter(Movie.poster_url == None).all()
        logger.info(f"🔍 Found {len(movies)} movies missing poster URLs.")
        
        for movie in movies:
            logger.info(f"🔄 Syncing: {movie.title}...")
            # Search on TMDB
            results = await data_sync.search_tmdb_movies(movie.title)
            
            if results:
                # Find the best match (closest title or first result)
                match = results[0]
                tmdb_id = match.get('id')
                poster_path = match.get('poster_path')
                backdrop_path = match.get('backdrop_path')
                
                if tmdb_id:
                    movie.tmdb_id = tmdb_id
                if poster_path:
                    movie.poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}"
                if backdrop_path:
                    movie.backdrop_url = f"https://image.tmdb.org/t/p/original{backdrop_path}"
                
                # Try to get more details (runtime, etc.)
                details = await data_sync.fetch_tmdb_details(tmdb_id)
                if details:
                    if not movie.overview:
                        movie.overview = details.get('overview', movie.overview)
                    if details.get('runtime'):
                        movie.runtime = details.get('runtime')
                
                logger.info(f"✅ Synced: {movie.title} (TMDB ID: {tmdb_id})")
            else:
                logger.warning(f"⚠️ No TMDB results for: {movie.title}")
            
            # Commit periodically to see progress
            db.commit()
            
        logger.info("🎬 TMDb Sync complete!")
        
    except Exception as e:
        logger.error(f"❌ Error during sync: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    asyncio.run(sync_all_movies())
