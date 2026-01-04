from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.share import Share
from typing import Optional

class ShareRepository:
    @staticmethod
    def create(db: Session, share: Share) -> Share:
        db.add(share)
        db.commit()
        db.refresh(share)
        return share

    @staticmethod
    def get_by_id(db: Session, share_id: str) -> Optional[Share]:
        stmt = select(Share).where(Share.id == share_id)
        result = db.execute(stmt)
        return result.scalars().first()
