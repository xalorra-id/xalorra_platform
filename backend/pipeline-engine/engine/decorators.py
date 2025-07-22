from functools import wraps

def task(func):
    """Menandai fungsi sebagai task"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"🔧 [TASK] Running: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"✅ [TASK] Finished: {func.__name__}")
        return result
    wrapper._is_task = True
    return wrapper


def flow(func):
    """Menandai fungsi sebagai flow"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"🚀 [FLOW] Starting flow: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"✅ [FLOW] Finished flow: {func.__name__}")
        return result
    wrapper._is_flow = True
    return wrapper
