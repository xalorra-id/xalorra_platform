import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file

DB_POOL = None  # Global connection pool

async def init_db_pool():
    global DB_POOL
    if DB_POOL is None:
        DB_POOL = await asyncpg.create_pool(
            host=os.getenv("DB_HOST", "localhost"),
            port=int(os.getenv("DB_PORT", 5432)),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASSWORD", "password"),
            database=os.getenv("DB_NAME", "xalorra_db"),
            min_size=1,
            max_size=10
        )
    return DB_POOL

async def get_connection():
    if DB_POOL is None:
        await init_db_pool()
    return DB_POOL
