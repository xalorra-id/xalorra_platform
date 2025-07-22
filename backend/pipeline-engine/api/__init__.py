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
