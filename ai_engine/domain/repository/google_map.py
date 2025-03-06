from abc import ABC, abstractmethod


class GoogleMapRepository(ABC):
    @abstractmethod
    def get_place_info(self, url: str) -> dict:
        pass
