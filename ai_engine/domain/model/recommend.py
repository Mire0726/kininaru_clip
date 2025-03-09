from pydantic import BaseModel


class RecommendRequest(BaseModel):
    url: str


class RecommendItem(BaseModel):
    name: str
    url: str
    content: str


class RecommednResponse(BaseModel):
    recommends: list[RecommendItem]
