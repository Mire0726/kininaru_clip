from fastapi import Depends

from api.deps.repository import google_map_dependency
from api.deps.services import summary_services_dependency
from domain.repository.google_map import GoogleMapRepository
from services.summary import SummaryServices
from usecase.summary import Summary, SummaryUsecase


def new_summary_usecase(
    summary_services: SummaryServices = summary_services_dependency,
    google_map: GoogleMapRepository = google_map_dependency,
) -> SummaryUsecase:
    return Summary(summary_services=summary_services, google_map=google_map)


summary_usecase_dependency: SummaryUsecase = Depends(new_summary_usecase)
