import json
import logging
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.movie import Movie

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def seed_offline():
    db: Session = SessionLocal()
    try:
        with open("data/sample_movies.json", "r") as f:
            movies_data = json.load(f)
            
        for m_data in movies_data:
            # Check if movie already exists
            existing = db.query(Movie).filter(Movie.title == m_data["title"]).first()
            if existing:
                logger.info(f"Skipping {m_data['title']}, already exists.")
                continue
                
            movie = Movie(
                title=m_data["title"],
                overview=m_data["overview"],
                runtime=m_data["runtime"],
                genres=m_data["genres"],
                content_type=m_data.get("type", "movie"),
                emotional_arc=m_data["emotional_arc"],
                ending_type=m_data["ending_type"],
                pace=m_data["pace"],
                tone=m_data["tone"]
            )
            db.add(movie)
            logger.info(f"Added {m_data['title']} to database.")
            
        db.commit()
        logger.info("Database seeding (offline) complete!")
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_offline()
