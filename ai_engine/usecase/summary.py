from abc import ABC, abstractmethod

from domain.model.summary import SummaryResponse
from services.summary import SummaryServices


class SummaryUsecase(ABC):
    def __init__(self, summary_services: SummaryServices):
        self.summary_services: SummaryServices = summary_services

    @abstractmethod
    def create(self, url: str) -> SummaryResponse:
        pass


class Summary(SummaryUsecase):
    def create(self, url: str) -> SummaryResponse:
        summary: str = self.summary_services.create(url=url)
        return SummaryResponse(summary=summary)
