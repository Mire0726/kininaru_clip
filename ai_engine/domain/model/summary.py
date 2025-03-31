from pydantic import BaseModel


class SummaryRequest(BaseModel):
    url: str


# TODO: Place ID追加する？
class SummaryResponse(BaseModel):
    summary: str
