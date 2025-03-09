from abc import ABC, abstractmethod

from domain.model.summary import SummaryResponse
from domain.repository.google_map import GoogleMapRepository
from services.summary import SummaryServices


class SummaryUsecase(ABC):
    def __init__(self, summary_services: SummaryServices, google_map: GoogleMapRepository):
        self.summary_services: SummaryServices = summary_services
        self.google_map: GoogleMapRepository = google_map

    @abstractmethod
    def create(self, url: str) -> SummaryResponse:
        pass


class Summary(SummaryUsecase):
    def create(self, url: str) -> SummaryResponse:
        basic_info: dict = self.google_map.get_basic_place_info(url=url)
        id: str = basic_info.get("id")
        summary: str = self.summary_services.create(id=id)

        return SummaryResponse(summary=summary)
