from fastapi import Depends

from domain.repository.google_map import GoogleMapRepository
from domain.repository.llm import LLMRepository
from infrastructure.googlemap.google_map import GoogleMap
from ml.llm.openai import OpenAILLM
from services.summary import Summarizer, SummaryServices
from usecase.summary import Summary, SummaryUsecase


def new_google_map_repository() -> GoogleMapRepository:
    return GoogleMap()


def new_llm_repository() -> LLMRepository:
    return OpenAILLM()


def new_summary_services(
    llm: LLMRepository = Depends(new_llm_repository),
    google_map: GoogleMapRepository = Depends(new_google_map_repository),
) -> SummaryServices:
    return Summarizer(llm=llm, google_map=google_map)


def new_summary_usecase(summary_services: SummaryServices = Depends(new_summary_services)) -> SummaryUsecase:
    return Summary(summary_survices=summary_services)
