# core/query_logger.py

import logging
import os
from datetime import datetime
from typing import Optional, List, Any, Dict

# Setup log file
LOG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "logs")
os.makedirs(LOG_DIR, exist_ok=True)
LOG_FILE_PATH = os.path.join(LOG_DIR, "query.log")

logger = logging.getLogger("query_logger")
logger.setLevel(logging.INFO)

# Hindari duplikat handler saat import ulang
if not logger.handlers:
    handler = logging.FileHandler(LOG_FILE_PATH)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)

def _format_context(user_context: Optional[Dict[str, Any]]) -> str:
    if not user_context:
        return "[context: -]"
    return f"[context: {user_context}]"

def log_query(sql: str, params: List[Any], user_context: Optional[Dict[str, Any]] = None):
    logger.info(f"SQL Executed: {sql} | Params: {params} {_format_context(user_context)}")

def log_error(sql: str, params: List[Any], error: Exception, user_context: Optional[Dict[str, Any]] = None):
    logger.error(f"SQL Error: {sql} | Params: {params} | Error: {str(error)} {_format_context(user_context)}")

def log_result(result: Any, user_context: Optional[Dict[str, Any]] = None):
    logger.info(f"Query Result: {result} {_format_context(user_context)}")
