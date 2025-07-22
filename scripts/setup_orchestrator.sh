#!/usr/bin/env bash
# Xalorra Orchestrator bootstrap script
# Usage: ./setup_orchestrator.sh [/custom/target/path]
set -e

BASE_DIR="${1:-/opt/xalorra_orchestrator}"

echo "📁  Creating Xalorra Orchestrator skeleton at $BASE_DIR"
mkdir -p "$BASE_DIR"/{engine,pipeline,registry,cli,api,utils,examples}

# Top‑level package markers
touch "$BASE_DIR"/{__init__.py,config.py,main.py}

# Package __init__.py
for pkg in engine pipeline registry cli api utils; do
  touch "$BASE_DIR/$pkg/__init__.py"
done

# ---------- engine ----------
cat > "$BASE_DIR/engine/runner.py" <<'PY'
class Runner:
    def run(self, pipeline):
        print(f"[Runner] Running pipeline: {pipeline.name}")
        pipeline.execute()
PY

cat > "$BASE_DIR/engine/scheduler.py" <<'PY'
import threading
import time

def run_scheduled(pipeline, interval_sec: int):
    def _loop():
        while True:
            pipeline.run()
            time.sleep(interval_sec)
    threading.Thread(target=_loop, daemon=True).start()
PY

cat > "$BASE_DIR/engine/state.py" <<'PY'
from enum import Enum

class State(str, Enum):
    PENDING = "PENDING"
    RUNNING = "RUNNING"
    SUCCESS = "SUCCESS"
    FAILED  = "FAILED"
PY

# ---------- pipeline ----------
cat > "$BASE_DIR/pipeline/base.py" <<'PY'
class Task:
    def __init__(self, name: str, **kwargs):
        self.name = name
        self.kwargs = kwargs
        self.upstream = []

    def add_upstream(self, task):
        self.upstream.append(task)

    def run(self, *args, **kwargs):
        raise NotImplementedError


class Pipeline:
    def __init__(self, name: str):
        self.name = name
        self.tasks = []

    def add_task(self, task, depends_on=None):
        if depends_on:
            task.add_upstream(depends_on)
        self.tasks.append(task)

    def execute(self):
        for task in self.tasks:
            task.run()
PY

# ---------- registry ----------
cat > "$BASE_DIR/registry/registry.py" <<'PY'
_registry = {}

def register(pipeline):
    _registry[pipeline.name] = pipeline

def get(name):
    return _registry.get(name)
PY

# ---------- CLI ----------
cat > "$BASE_DIR/cli/main.py" <<'PY'
import argparse
from registry.registry import get

def main():
    parser = argparse.ArgumentParser(description="Xalorra Orchestrator CLI")
    subparsers = parser.add_subparsers(dest="command", required=True)

    run_p = subparsers.add_parser("run", help="Run a registered pipeline")
    run_p.add_argument("pipeline", help="Pipeline name")

    args = parser.parse_args()

    if args.command == "run":
        pipeline = get(args.pipeline)
        if pipeline:
            pipeline.run()
        else:
            print(f"Pipeline '{args.pipeline}' not found")

if __name__ == "__main__":
    main()
PY

# ---------- utils ----------
cat > "$BASE_DIR/utils/logging.py" <<'PY'
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
logger = logging.getLogger("xalorra_orchestrator")
PY

# ---------- API ----------
cat > "$BASE_DIR/api/__init__.py" <<'PY'
from fastapi import FastAPI
from registry.registry import get

app = FastAPI(title="Xalorra Orchestrator API")

@app.post("/run/{pipeline_name}")
def run_pipeline(pipeline_name: str):
    pipeline = get(pipeline_name)
    if pipeline:
        pipeline.run()
        return {"status": "started"}
    return {"error": "pipeline not found"}
PY

# ---------- example ----------
cat > "$BASE_DIR/examples/sample_pipeline.py" <<'PY'
from pipeline.base import Task, Pipeline
from registry.registry import register

class PrintTask(Task):
    def __init__(self, name, message):
        super().__init__(name)
        self.message = message

    def run(self):
        print(self.message)

pipeline = Pipeline("hello_world")
pipeline.add_task(PrintTask("t1", "Hello, Xalorra!"))
register(pipeline)
PY

echo "✅  Skeleton ready!"
echo ""
echo "To test quickly:"
echo "  cd $BASE_DIR/examples"
echo "  python sample_pipeline.py          # registers the pipeline"
echo "  python -m cli.main run hello_world # runs via CLI"
