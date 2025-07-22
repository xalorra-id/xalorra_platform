import json
from pathlib import Path


class State:
    def __init__(self):
        self.status = {}

    def update(self, task_name, status):
        self.status[task_name] = status

    def get(self, task_name):
        return self.status.get(task_name, "pending")

    def all(self):
        return self.status


class StateJSON(State):
    def __init__(self, filepath="state.json"):
        super().__init__()
        self.filepath = Path(filepath)
        if self.filepath.exists():
            self.load()

    def save(self):
        with open(self.filepath, "w") as f:
            json.dump(self.status, f)

    def load(self):
        with open(self.filepath, "r") as f:
            self.status = json.load(f)
