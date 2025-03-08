import requests
from fastapi import FastAPI

from api.deps.usecase import summary_usecase_dependency
from domain.model.summary import SummaryRequest, SummaryResponse
from src.schema.recommend import recommednResponse, recommendRequest
from src.services.recommend import recommend
from usecase.summary import SummaryUsecase

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/summaries")
def construct_summary(
    request: SummaryRequest, summary_usecase: SummaryUsecase = summary_usecase_dependency
) -> SummaryResponse:
    if len(request.url) < 100:
        response = requests.get(request.url)
        request.url = response.url

    response: SummaryResponse = summary_usecase.create(url=request.url)

    return response


@app.post("/recommends")
def pred_recommend_items(request: recommendRequest) -> recommednResponse:
    res = recommend(request.url, rad=1500)
    # レスポンスが空だった場合再度推論
    if res.recommends == []:
        res = recommend(request.url, rad=5000)

    return res


# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
