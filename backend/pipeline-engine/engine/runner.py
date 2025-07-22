# engine/runner.py
from pipeline.base import Pipeline
from engine.socket_client import SocketNotifier

class Runner:
    def __init__(self, pipeline: Pipeline):
        self.pipeline = pipeline
        self.notifier = SocketNotifier()

    def run(self):
        self.notifier.emit("pipeline:start", {"name": self.pipeline.name})
        print(f"🚀 Running pipeline: {self.pipeline.name}")

        for task in self.pipeline.tasks:
            self.notifier.emit("task:start", {"task": task.name})
            task.run()
            self.notifier.emit("task:done", {"task": task.name})

        self.notifier.emit("pipeline:done", {"name": self.pipeline.name})
        print(f"✅ Done: {self.pipeline.name}")
