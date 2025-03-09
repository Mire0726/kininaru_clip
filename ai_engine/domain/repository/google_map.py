from abc import ABC, abstractmethod


class GoogleMapRepository(ABC):
    @abstractmethod
    def get_basic_place_info(self, url: str) -> dict:
        pass

    @abstractmethod
    def get_detailed_place_info(self, id: str) -> dict:
        pass
