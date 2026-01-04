# app/main.py

from fastapi import FastAPI
from app.core.config import get_settings
from app.core.logger import get_logger
from app.api.v1 import recommend, research, auth, users, watchlist, chat, share

settings = get_settings()
logger = get_logger(__name__)

app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG
)

app.include_router(recommend.router, prefix=f"{settings.API_V1_STR}/recommend", tags=["recommend"])
app.include_router(research.router, prefix=f"{settings.API_V1_STR}/research", tags=["research"])
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(users.router, prefix=f"{settings.API_V1_STR}/users", tags=["users"])
app.include_router(watchlist.router, prefix=f"{settings.API_V1_STR}/watchlist", tags=["watchlist"])
app.include_router(chat.router, prefix=f"{settings.API_V1_STR}/chat", tags=["chat"])
app.include_router(share.router, prefix=f"{settings.API_V1_STR}/share", tags=["share"])


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}


@app.on_event("startup")
def startup_event():
    logger.info("🚀 CinePulse AI Movie Recommendation API started")


@app.on_event("shutdown")
def shutdown_event():
    logger.info("🛑 CinePulse AI Movie Recommendation API stopped")

