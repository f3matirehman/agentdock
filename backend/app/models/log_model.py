from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.models import Base


class Log(Base):
    __tablename__ = 'logs'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event = Column(String, nullable=False)
    agent_id = Column(UUID(as_uuid=True), nullable=True)
    tool_id = Column(UUID(as_uuid=True), nullable=True)
    message = Column(String, nullable=True, default="")
    timestamp = Column(DateTime, default=datetime.utcnow)
