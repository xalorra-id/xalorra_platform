# apps/api/models/dataset.py
from sqlalchemy import Column, String, DateTime
from apps.api.db.base_class import Base
import datetime

class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    path = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # RLS untuk `public` schema
    workspace_id = Column(String, nullable=True, index=True)
