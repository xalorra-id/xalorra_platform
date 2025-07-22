from fastapi import Request

def get_current_schema(request: Request) -> str:
    schema = request.headers.get("X-Tenant-Schema")
    if not schema:
        raise ValueError("Tenant schema not provided in 'X-Tenant-Schema' header")
    return schema
