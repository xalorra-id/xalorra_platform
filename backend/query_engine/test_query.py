import sys
from pathlib import Path

# Tambahkan root folder ke sys.path supaya Python bisa menemukan modul core, utils, dll
root_dir = Path(__file__).parent.resolve()
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

import asyncio
from core.query_executor import run_query
from db.connection import init_db_pool
from utils.env import DEFAULT_ORG_ID

async def main():
    await init_db_pool()
    sql = "SELECT * FROM datasets"
    user_context = {"org_id": DEFAULT_ORG_ID}
    result = await run_query(sql, user_context=user_context)
    print("Query result:")
    for row in result:
        print(row)

if __name__ == "__main__":
    asyncio.run(main())
