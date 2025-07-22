from pydantic import BaseModel
from typing import List

class LabelRequest(BaseModel):
    texts: List[str]

class LabelResult(BaseModel):
    text: str
    label: str

class LabelResponse(BaseModel):
    results: List[LabelResult]
