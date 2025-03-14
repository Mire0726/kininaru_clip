from fastapi import Depends

from domain.repository.google_map import GoogleMapRepository
from domain.repository.llm import LLMRepository
from infrastructure.googlemap.google_map import GoogleMap
from ml.llm.openai import OpenAILLM


def new_google_map_repository() -> GoogleMapRepository:
    return GoogleMap()


def new_llm_repository() -> LLMRepository:
    return OpenAILLM()


llm_dependency = Depends(new_llm_repository)
google_map_dependency = Depends(new_google_map_repository)
