import time
from engine.scheduler import Scheduler
from engine.runner import Runner
from pipeline.base import Pipeline, Task


class DummyTask(Task):
    def run(self):
        print(f"[{self.name}] Hello from scheduled task")


def run_pipeline():
    pipeline = Pipeline("scheduled_pipeline")
    pipeline.add_task(DummyTask("say_hi"))
    runner = Runner(pipeline)
    runner.run()


if __name__ == "__main__":
    sched = Scheduler()
    sched.schedule(run_pipeline, 5)  # tiap 5 detik
    print("⏳ Running scheduler... (Ctrl+C to exit)")
    while True:
        time.sleep(1)
