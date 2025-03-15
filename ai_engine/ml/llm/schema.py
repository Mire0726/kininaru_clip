from pydantic import BaseModel


class PlaceKeyword(BaseModel):
    keyword: str
