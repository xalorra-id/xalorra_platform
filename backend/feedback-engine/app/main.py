from fastapi import FastAPI, HTTPException
from app.schemas import LabelRequest, LabelResponse
from app.services import label_texts

app = FastAPI(title="Xalorra Labeling GPT API")

@app.post("/label", response_model=LabelResponse)
async def label_endpoint(request: LabelRequest):
    try:
        results = await label_texts(request.texts)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
