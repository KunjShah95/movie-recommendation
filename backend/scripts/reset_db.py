from sqlalchemy import create_engine, text
from app.db.base import Base
from app.core.config import get_settings
# Import all models to ensure they're registered with Base
from app.models.movie import Movie
from app.models.user import User
from app.models.watchlist import Watchlist
from app.models.share import Share

settings = get_settings()

def reset_db():
    engine = create_engine(settings.POSTGRES_URL)
    
    print("[WARNING] This will delete ALL existing data in all tables.")
    
    with engine.connect() as conn:
        # Drop all tables if they exist
        conn.execute(text("DROP TABLE IF EXISTS watchlist CASCADE"))
        conn.execute(text("DROP TABLE IF EXISTS shares CASCADE"))
        conn.execute(text("DROP TABLE IF EXISTS movies CASCADE"))
        conn.execute(text("DROP TABLE IF EXISTS users CASCADE"))
        conn.commit()
        print("[OK] Dropped all old tables.")
    
    # Recreate all tables from models
    Base.metadata.create_all(bind=engine)
    print("[OK] Created all tables with updated schema!")
    print("   - movies (with release_year column)")
    print("   - users")
    print("   - watchlist")
    print("   - shares")

if __name__ == "__main__":
    reset_db()
