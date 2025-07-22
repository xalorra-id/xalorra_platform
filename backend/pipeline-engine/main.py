# main.py
from pipeline import register_all
from registry.registry import get
from engine.runner import Runner
from engine.state import StateJSON
from engine.socket_client import SocketNotifier


def main():
    register_all()

    pipeline = get("hello_decorated")  # ubah ke pipeline dekorator
    if pipeline:
        # Inject state manager dan socket notifier ke pipeline
        pipeline.state = StateJSON("pipeline_state.json")
        pipeline.notifier = SocketNotifier("http://localhost:5000")

        runner = Runner(pipeline)
        runner.run()
    else:
        print("🚫 Pipeline 'hello_decorated' tidak ditemukan.")


if __name__ == "__main__":
    main()
