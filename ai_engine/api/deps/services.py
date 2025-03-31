from fastapi import Depends

from api.deps.repository import google_map_dependency, llm_dependency
from domain.repository.google_map import GoogleMapRepository
from domain.repository.llm import LLMRepository
from services.summary import Summarizer, SummaryServices


def new_summary_services(
    llm: LLMRepository = llm_dependency,
    google_map: GoogleMapRepository = google_map_dependency,
) -> SummaryServices:
    return Summarizer(llm=llm, google_map=google_map)


summary_services_dependency: SummaryServices = Depends(new_summary_services)
