## 📦 app/core/config.py
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql+asyncpg://agentdock:secret@db:5432/agentdock_db")

settings = Settings()
