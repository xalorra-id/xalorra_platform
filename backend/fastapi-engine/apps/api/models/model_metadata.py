# apps/api/models/model_metadata.py

from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from apps.api.db_sqlalchemy import Base

class TrainingRun(Base):
    __tablename__ = "training_runs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant = Column(String, nullable=False)
    model_name = Column(String, nullable=False)
    dataset_name = Column(String)
    status = Column(String, default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
