from pydantic import BaseModel


class recommendRequest(BaseModel):
    url: str


class recommendItem(BaseModel):
    name: str
    url: str
    content: str


class recommednResponse(BaseModel):
    recommends: list[recommendItem]
