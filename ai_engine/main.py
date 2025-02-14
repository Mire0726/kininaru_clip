from fastapi import FastAPI
import uvicorn
from src.schema.summary import SummaryRequest
from src.services.summary import summarize_map_info
import json

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/summaries")
def construct_summary(request: SummaryRequest):
    res = summarize_map_info(request.url)
    res_json = json.loads(res)

    return res_json


# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
