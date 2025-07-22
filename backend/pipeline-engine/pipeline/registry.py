from pipeline.base import Task, Pipeline
from registry.registry import register


def register_all():
    # Hello world pipeline
    class PrintTask(Task):
        def __init__(self, name, message):
            super().__init__(name)
            self.message = message

        def run(self):
            print(self.message)

    pipeline = Pipeline("hello_world")
    pipeline.add_task(PrintTask("t1", "Hello, Xalorra!"))
    register(pipeline)

    # ✅ Baru import di sini untuk hindari circular import
    from pipelines.data_flow import register_data_flow

    register_data_flow()
