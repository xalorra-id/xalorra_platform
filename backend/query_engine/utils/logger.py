import logging
import os
from datetime import datetime

LOG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "logs")
os.makedirs(LOG_DIR, exist_ok=True)

LOG_FILE_PATH = os.path.join(LOG_DIR, "query.log")

logger = logging.getLogger("query_logger")
logger.setLevel(logging.INFO)

if not logger.handlers:
    handler = logging.FileHandler(LOG_FILE_PATH)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)

def log_query(sql: str, params: list):
    logger.info(f"SQL Executed: {sql} | Params: {params}")

def log_error(sql: str, params: list, error: Exception):
    logger.error(f"SQL Error: {sql} | Params: {params} | Error: {error}")

def log_result(result):
    logger.info(f"Query Result: {result}")
