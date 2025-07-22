from pipeline.base import Task, Pipeline
from registry.registry import register


class LoadCSVTask(Task):
    def __init__(self, name, path):
        super().__init__(name)
        self.path = path
        self.data = None

    def run(self):
        with open(self.path, "r") as f:
            lines = f.readlines()
            self.data = lines
        print(f"[{self.name}] Loaded {len(self.data)} lines from {self.path}")


class PrintSummaryTask(Task):
    def __init__(self, name, load_task: LoadCSVTask):
        super().__init__(name)
        self.load_task = load_task

    def run(self):
        if self.load_task.data:
            print(f"[{self.name}] Total lines loaded: {len(self.load_task.data)}")
        else:
            print(f"[{self.name}] No data found.")


def register_data_flow():
    pipeline = Pipeline("data_flow")

    load_task = LoadCSVTask("load_csv", "examples/sample.csv")
    summary_task = PrintSummaryTask("summary", load_task)

    pipeline.add_task(load_task)
    pipeline.add_task(summary_task)

    register(pipeline)
