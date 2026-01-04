import json
import logging
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.movie import Movie

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def populate_offline():
    db: Session = SessionLocal()
    try:
        with open("data/sample_movies.json", "r") as f:
            movies_data = json.load(f)
            
        for m_data in movies_data:
            # Check if movie already exists
            existing = db.query(Movie).filter(Movie.title == m_data["title"]).first()
            if existing:
                # Update existing if needed, or skip
                logger.info(f"Skipping {m_data['title']}, already exists.")
                continue
                
            movie = Movie(
                title=m_data["title"],
                overview=m_data["overview"],
                release_year=m_data.get("release_year", 2023),
                runtime=m_data["runtime"],
                trailer_url=m_data.get("trailer_url"),
                streaming_platforms=m_data.get("streaming_platforms", []),
                backdrop_url=m_data.get("backdrop_url"),
                genres=m_data["genres"],
                content_type=m_data.get("type", "movie"),
                emotional_arc=m_data["emotional_arc"],
                ending_type=m_data["ending_type"],
                pace=m_data["pace"],
                tone=m_data["tone"]
            )
            db.add(movie)
            logger.info(f"Added {m_data['title']} ({m_data.get('type', 'movie')}) to database.")
            
        db.commit()
        logger.info("Database population (offline) complete!")
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    populate_offline()
