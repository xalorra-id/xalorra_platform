# pipeline/decorators.py
from pipeline.base import Task, Pipeline
from registry.registry import register
import inspect


def task(fn):
    class FunctionTask(Task):
        def __init__(self):
            super().__init__(fn.__name__)
            self.fn = fn
            self.result = None

        def run(self):
            print(f"🔧 Running task: {self.name}")
            self.result = self.fn()
            print(f"✅ Finished task: {self.name}")

    return FunctionTask()


def flow(fn):
    def wrapper():
        flow_pipeline = Pipeline(fn.__name__)
        context = {}

        sig = inspect.signature(fn)
        for param in sig.parameters.values():
            if param.default != inspect.Parameter.empty and isinstance(param.default, Task):
                context[param.name] = param.default

        fn(**context)  # initialize pipeline structure

        for task in context.values():
            flow_pipeline.add_task(task)

        register(flow_pipeline)

    return wrapper
