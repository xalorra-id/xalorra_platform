# main.py
from xalorra.cli import runserver
from routes import datasets  # wajib! untuk trigger @get decorator

if __name__ == "__main__":
    runserver(port=8002)
