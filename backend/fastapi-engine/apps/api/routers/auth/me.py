from fastapi import APIRouter, Depends
from apps.api.auth.jwt_utils import get_current_user
from typing import Dict

router = APIRouter()

@router.get("/me", response_model=Dict)
def read_current_user(current_user: Dict = Depends(get_current_user)):
    return current_user
