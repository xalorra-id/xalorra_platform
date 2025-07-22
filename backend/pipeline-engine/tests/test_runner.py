from engine.runner import Runner
from pipeline.base import Pipeline, Task


class DummyTask(Task):
    def run(self):
        print(f"[{self.name}] Running dummy task")


def test_runner_execution():
    pipeline = Pipeline("test_pipeline")
    pipeline.add_task(DummyTask("t1"))
    pipeline.add_task(DummyTask("t2"))

    runner = Runner(pipeline)
    runner.run()
