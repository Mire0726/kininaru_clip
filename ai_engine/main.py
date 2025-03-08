import requests
from fastapi import Depends, FastAPI

from api.deps import new_summary_usecase
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
    request: SummaryRequest, summary_usecase: SummaryUsecase = Depends(new_summary_usecase)
) -> SummaryResponse:
    if len(request.url) < 100:
        response = requests.get(request.url)
        request.url = response.url

    res: SummaryResponse = summary_usecase.create(url=request.url)

    return res


@app.post("/recommends")
def pred_recommend_items(request: recommendRequest) -> recommednResponse:
    res = recommend(request.url, rad=1500)
    # レスポンスが空だった場合再度推論
    if res.recommends == []:
        res = recommend(request.url, rad=5000)

    return res


# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
