from .registry import register_all
from pipelines.hello_decorated import hello_decorated

__all__ = ["register_all"]

def register_all():
    hello_decorated()