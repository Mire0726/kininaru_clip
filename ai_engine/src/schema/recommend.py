from pydantic import BaseModel
from typing import List


class recommendRequest(BaseModel):
    url: str


class recommendItem(BaseModel):
    name: str
    url: str
    content: str


class recommednResponse(BaseModel):
    recommends: List[recommendItem]
