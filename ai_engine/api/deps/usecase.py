from fastapi import Depends

from api.deps.repository import google_map_dependency, llm_dependency
from api.deps.services import summary_services_dependency
from domain.repository.google_map import GoogleMapRepository
from domain.repository.llm import LLMRepository
from services.summary import SummaryServices
from usecase.recommend import Recommend, RecommendUsecase
from usecase.summary import Summary, SummaryUsecase


def new_summary_usecase(
    summary_services: SummaryServices = summary_services_dependency,
    google_map: GoogleMapRepository = google_map_dependency,
) -> SummaryUsecase:
    return Summary(summary_services=summary_services, google_map=google_map)


def new_recommend_usecase(
    summary_services: SummaryServices = summary_services_dependency,
    google_map: GoogleMapRepository = google_map_dependency,
    llm: LLMRepository = llm_dependency,
) -> Recommend:
    return Recommend(llm=llm, google_map=google_map, summary_services=summary_services)


summary_usecase_dependency: SummaryUsecase = Depends(new_summary_usecase)
recommend_usecase_dependency: RecommendUsecase = Depends(new_recommend_usecase)
