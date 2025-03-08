from abc import ABC, abstractmethod
from domain.model.summary import SummaryResponse
from services.summary import SummaryServices

class SummaryUsecase(ABC):
    def __init__(self, summary_survices: SummaryServices):
        self.summary_survices: SummaryServices = summary_survices
    
    @abstractmethod
    def create(self, url: str) -> SummaryResponse:
        pass

class Summary(SummaryUsecase):
    def create(self, url: str) -> SummaryResponse:
        summary: str = self.summary_survices.create(url=url)
        return SummaryResponse(summary=summary)