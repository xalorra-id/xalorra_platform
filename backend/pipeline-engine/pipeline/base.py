# pipeline/base.py
class Task:
    def __init__(self, name):
        self.name = name
        self.pipeline = None  # assigned by pipeline.add_task()

    def run(self):
        pass


class Pipeline:
    def __init__(self, name):
        self.name = name
        self.tasks = []
        self.state = None
        self.notifier = None

    def add_task(self, task):
        task.pipeline = self
        self.tasks.append(task)

    def run(self):
        print(f"🚀 Starting pipeline: {self.name}")
        if self.notifier:
            self.notifier.emit("pipeline:start", {"name": self.name})
        if self.state:
            self.state.set("status", "running")

        for task in self.tasks:
            task.run()

        if self.state:
            self.state.set("status", "done")
        if self.notifier:
            self.notifier.emit("pipeline:done", {"name": self.name})
        print(f"✅ Finished pipeline: {self.name}")

    def update_state(self, task_name, status):
        if self.state:
            self.state.set(task_name, status)

    def notify(self, event, data):
        if self.notifier:
            self.notifier.emit(event, data)
