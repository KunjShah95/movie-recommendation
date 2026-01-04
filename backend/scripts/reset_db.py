from sqlalchemy import create_engine, text
from app.db.base import Base
from app.core.config import get_settings
from app.models.movie import Movie

settings = get_settings()

def reset_db():
    engine = create_engine(settings.POSTGRES_URL)
    
    print("⚠️  Warning: This will delete all existing data in the movies table.")
    
    with engine.connect() as conn:
        # Drop the table if it exists
        conn.execute(text("DROP TABLE IF EXISTS movies CASCADE"))
        conn.commit()
        print("✅ Dropped old movies table.")
    
    # Recreate all tables from models
    Base.metadata.create_all(bind=engine)
    print("✅ Created new movies table with content_type column.")

if __name__ == "__main__":
    reset_db()
