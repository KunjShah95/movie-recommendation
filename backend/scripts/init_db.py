# backend/scripts/init_db.py

from app.db.session import engine
from app.db.base import Base
from app.models.movie import Movie
from app.models.user import User
from app.models.watchlist import Watchlist
from app.models.share import Share

def init_db():
    print("🚀 Initializing database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")

if __name__ == "__main__":
    init_db()
