from pipeline.base import Task, Pipeline
from registry.registry import register


class LoadCSVTask(Task):
    def __init__(self, name, path):
        super().__init__(name)
        self.path = path
        self.data = None

    def run(self):
        if self.pipeline:
            self.pipeline.notify("task:start", {"task": self.name})
            self.pipeline.update_state(self.name, "running")

        with open(self.path, "r") as f:
            lines = f.readlines()
            self.data = lines

        print(f"[{self.name}] Loaded {len(self.data)} lines from {self.path}")

        if self.pipeline:
            self.pipeline.update_state(self.name, "done")
            self.pipeline.notify("task:done", {"task": self.name})


class PrintSummaryTask(Task):
    def __init__(self, name, load_task: LoadCSVTask):
        super().__init__(name)
        self.load_task = load_task

    def run(self):
        if self.pipeline:
            self.pipeline.notify("task:start", {"task": self.name})
            self.pipeline.update_state(self.name, "running")

        if self.load_task.data:
            print(f"[{self.name}] Total lines loaded: {len(self.load_task.data)}")
        else:
            print(f"[{self.name}] No data found.")

        if self.pipeline:
            self.pipeline.update_state(self.name, "done")
            self.pipeline.notify("task:done", {"task": self.name})


def register_data_flow():
    pipeline = Pipeline("data_flow")
    load_task = LoadCSVTask("load_csv", "examples/sample.csv")
    summary_task = PrintSummaryTask("summary", load_task)

    pipeline.add_task(load_task)
    pipeline.add_task(summary_task)

    register(pipeline)
