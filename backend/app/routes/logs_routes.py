from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.log_model import Log

router = APIRouter()

@router.get("/logs/")
async def get_logs(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Log).order_by(Log.timestamp.desc()))
    logs = result.scalars().all()
    return logs
