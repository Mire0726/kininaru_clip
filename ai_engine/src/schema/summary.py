from pydantic import BaseModel


class SummaryRequest(BaseModel):
    url: str
