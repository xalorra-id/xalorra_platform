from db.connection import get_connection
from typing import List, Dict, Any, Optional
from utils.env import DEFAULT_ORG_ID
from utils.logger import log_query, log_result, log_error

async def run_query(
    sql: str,
    params: Optional[List[Any]] = None,
    user_context: Optional[Dict[str, Any]] = None
) -> List[Dict[str, Any]]:
    pool = await get_connection()
    async with pool.acquire() as conn:
        org_id = (user_context or {}).get("org_id", DEFAULT_ORG_ID)
        try:
            # PostgreSQL SET tidak support parameter binding, interpolasi string literal:
            await conn.execute(f"SET app.org_id = '{org_id}';")
            log_query(sql, params or [])

            records = await conn.fetch(sql, *(params or []))
            result = [dict(r) for r in records]
            log_result(result)
            return result

        except Exception as e:
            log_error(sql, params or [], e)
            raise
