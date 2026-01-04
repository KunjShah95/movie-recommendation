from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional

class Settings(BaseSettings):
    APP_NAME: str = "CinePulse AI"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = False

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # Database
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "postgres"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432

    @property
    def POSTGRES_URL(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # External APIs
    TMDB_API_KEY: Optional[str] = None
    OMDB_API_KEY: Optional[str] = None
    SERPAPI_API_KEY: Optional[str] = None
    FIRECRAWL_API_KEY: Optional[str] = None
    GOOGLE_API_KEY: Optional[str] = None

    # Recommendation Weights
    EMOTION_WEIGHT: float = 0.30
    INTENT_WEIGHT: float = 0.25
    ARC_WEIGHT: float = 0.20
    CONTEXT_WEIGHT: float = 0.15
    PERSONALITY_WEIGHT: float = 0.10

    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache
def get_settings() -> Settings:
    return Settings()