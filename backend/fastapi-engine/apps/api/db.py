from supabase import create_client, Client
from dotenv import load_dotenv
import os

# Load environment
load_dotenv()

# Get from .env
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key:
    raise ValueError("Supabase URL or Key is not set in the .env file.")

client: Client = create_client(url, key)

# Fungsi helper untuk import
def get_db() -> Client:
    return client
