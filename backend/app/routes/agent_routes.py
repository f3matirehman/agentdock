from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.agent_model import Agent
from pydantic import BaseModel
import uuid

router = APIRouter()

class AgentCreate(BaseModel):
    name: str
    description: str
    config: dict

@router.post("/agents/")
async def create_agent(agent: AgentCreate, db: AsyncSession = Depends(get_db)):
    db_agent = Agent(name=agent.name, description=agent.description, config=agent.config)
    db.add(db_agent)
    await db.commit()
    await db.refresh(db_agent)
    return {"id": db_agent.id, "status": "registered"}

@router.get("/agents/")
async def list_agents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Agent))
    agents = result.scalars().all()
    return agents

@router.delete("/agents/{agent_id}")
async def delete_agent(agent_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Agent).where(Agent.id == uuid.UUID(agent_id)))
    agent = result.scalar_one_or_none()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    await db.delete(agent)
    await db.commit()
    return {"status": "deregistered"}