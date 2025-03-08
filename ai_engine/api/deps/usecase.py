from fastapi import Depends

from api.deps.services import summary_services_dependency
from services.summary import SummaryServices
from usecase.summary import Summary, SummaryUsecase


def new_summary_usecase(summary_services: SummaryServices = summary_services_dependency) -> SummaryUsecase:
    return Summary(summary_services=summary_services)


summary_usecase_dependency: SummaryUsecase = Depends(new_summary_usecase)
