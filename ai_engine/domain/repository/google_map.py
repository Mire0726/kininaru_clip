from abc import ABC, abstractmethod


class GoogleMapRepository(ABC):
    @abstractmethod
    def get_basic_place_info(self, url: str) -> dict:
        pass

    @abstractmethod
    def get_detailed_place_info(self, id: str) -> dict:
        pass

    # TODO: langの指定方法とアノテーションの方法
    @abstractmethod
    def search_nearby_places(
        self, location: tuple[float, float], radius: int, types: list[str], keyword: str, lang: str
    ) -> list[dict]:
        pass
