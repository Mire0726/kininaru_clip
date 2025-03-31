import requests
from fastapi import FastAPI

from api.deps.usecase import recommend_usecase_dependency, summary_usecase_dependency
from domain.model.recommend import RecommednResponse, RecommendItem, RecommendRequest
from domain.model.summary import SummaryRequest, SummaryResponse
from usecase.recommend import RecommendUsecase
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
def pred_recommend_items(
    request: RecommendRequest, recommend_usecase: RecommendUsecase = recommend_usecase_dependency
) -> RecommednResponse:
    if len(request.url) < 100:
        response = requests.get(request.url)
        request.url = response.url

    rec_items: list[RecommendItem] = recommend_usecase.inference(url=request.url, radius=1500)
    # レスポンスが空だった場合再度推論
    if rec_items == []:
        rec_items = recommend_usecase.inference(url=request.url, radius=5000)

    response: RecommednResponse = RecommednResponse(recommends=rec_items)

    return response
