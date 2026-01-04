from sqlalchemy import create_engine
from app.db.base import Base
from app.db.session import SessionLocal
from app.models.movie import Movie
from app.core.config import get_settings

settings = get_settings()

def init_db():
    engine = create_engine(settings.POSTGRES_URL)
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if we already have movies
    if db.query(Movie).count() > 0:
        print("Database already seeded.")
        return

    sample_movies = [
        Movie(
            title="The Shawshank Redemption",
            overview="Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            runtime=142,
            genres=["Drama"],
            emotional_arc=["hopeful", "intense", "triumphant"],
            ending_type="hopeful",
            pace="medium",
            tone="uplifting"
        ),
        Movie(
            title="Amélie",
            overview="Amélie is an innocent and naive girl in Paris who decides to help those around her and along the way, discovers love.",
            runtime=122,
            genres=["Romance", "Comedy"],
            emotional_arc=["whimsical", "warm", "joyful"],
            ending_type="hopeful",
            pace="medium",
            tone="uplifting"
        ),
        Movie(
            title="Manchester by the Sea",
            overview="A depressed uncle is asked to take care of his teenage nephew after the boy's father dies.",
            runtime=137,
            genres=["Drama"],
            emotional_arc=["solemn", "heavy", "reflective"],
            ending_type="bittersweet",
            pace="slow",
            tone="heavy"
        ),
        Movie(
            title="Spirited Away",
            overview="During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
            runtime=125,
            genres=["Animation", "Adventure", "Fantasy"],
            emotional_arc=["curious", "scary", "empowering"],
            ending_type="hopeful",
            pace="fast",
            tone="uplifting"
        ),
        Movie(
            title="Before Sunrise",
            overview="A young man and woman meet on a train in Europe, and wind up spending one evening together in Vienna.",
            runtime=101,
            genres=["Drama", "Romance"],
            emotional_arc=["intellectual", "romantic", "fleeting"],
            ending_type="neutral",
            pace="slow",
            tone="neutral"
        )
    ]
    
    db.add_all(sample_movies)
    db.commit()
    print("Database initialized and sample movies added!")

if __name__ == "__main__":
    init_db()
