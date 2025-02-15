from typing import List

from pydantic import BaseModel


class searchKyeword(BaseModel):
    keyword: str
    types: List[str]
