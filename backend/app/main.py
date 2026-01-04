# app/main.py

from fastapi import FastAPI
from app.core.config import get_settings
from app.core.logger import get_logger
from app.api.v1 import recommend, research

settings = get_settings()
logger = get_logger(__name__)

app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG
)

app.include_router(recommend.router, prefix=f"{settings.API_V1_STR}/recommend", tags=["recommend"])
app.include_router(research.router, prefix=f"{settings.API_V1_STR}/research", tags=["research"])


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}


@app.on_event("startup")
def startup_event():
    logger.info("🚀 CinePulse AI Movie Recommendation API started")


@app.on_event("shutdown")
def shutdown_event():
    logger.info("🛑 CinePulse AI Movie Recommendation API stopped")

