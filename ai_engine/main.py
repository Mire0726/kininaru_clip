from fastapi import FastAPI

from src.schema.recommend import recommednResponse, recommendRequest
from src.schema.summary import SummaryRequest, SummaryResponse
from src.services.recommend import recommend
from src.services.summary import summarize_map_info

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/summaries")
def construct_summary(request: SummaryRequest) -> SummaryResponse:
    res = summarize_map_info(request.url)

    return res


@app.post("/recommends")
def pred_recommend_items(request: recommendRequest) -> recommednResponse:
    res = recommend(request.url)

    return res


# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
