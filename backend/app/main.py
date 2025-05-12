from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import agent_routes, tool_routes, logs_routes
from app.models.log_model import Base as LogBase
from app.core.database import engine
import asyncio
import asyncpg
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(agent_routes.router)
app.include_router(tool_routes.router)
app.include_router(logs_routes.router)

@app.get("/")
def root():
    return {"message": "Backend is running!"}

@app.on_event("startup")
async def init_log_table():
    max_retries = 10
    delay = 2
    for attempt in range(max_retries):
        try:
            async with engine.begin() as conn:
                await conn.run_sync(LogBase.metadata.create_all)
            print("✅ logs table ready.")
            break
        except Exception as e:
            print(f"⏳ Attempt {attempt + 1} failed: {e}")
            await asyncio.sleep(delay)
    else:
        print("❌ Failed to connect to DB after retries.")
        raise RuntimeError("Database not reachable after retries")
