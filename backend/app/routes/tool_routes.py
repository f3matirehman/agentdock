from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.tool_model import Tool
from pydantic import BaseModel
import uuid

router = APIRouter()

class ToolCreate(BaseModel):
    name: str
    config: dict

@router.post("/tools/")
async def create_tool(tool: ToolCreate, db: AsyncSession = Depends(get_db)):
    db_tool = Tool(name=tool.name, config=tool.config)
    db.add(db_tool)
    await db.commit()
    await db.refresh(db_tool)
    return {"id": db_tool.id, "status": "registered"}

@router.get("/tools/")
async def list_tools(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Tool))
    tools = result.scalars().all()
    return tools

@router.delete("/tools/{tool_id}")
async def delete_tool(tool_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Tool).where(Tool.id == uuid.UUID(tool_id)))
    tool = result.scalar_one_or_none()
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    await db.delete(tool)
    await db.commit()
    return {"status": "deregistered"}