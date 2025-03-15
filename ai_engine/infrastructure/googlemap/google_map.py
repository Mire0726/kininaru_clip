import os
from urllib.parse import ParseResult, unquote, urlparse

from dotenv import load_dotenv
from googlemaps import Client

from domain.repository.google_map import GoogleMapRepository

load_dotenv()
GOOGLEMAP_API_KEY: str = os.environ.get("GOOGLEMAP_API_KEY")


class GoogleMap(GoogleMapRepository):
    def __init__(self):
        self.gmaps_client: Client = Client(key=GOOGLEMAP_API_KEY)

    def _parse_url(self, url: str) -> tuple[str, float, float]:
        """
        url : GoogleMap URL

        tuple[str, float, float] : location_name, latitude, longtiude
        """
        parsed_url: ParseResult = urlparse(url)
        encoded_place_names: list[str] = parsed_url.path.split("/")[3].split("+")
        location_info: list[str] = parsed_url.path.split("/")[4].split(",")
        latitude: float = float(location_info[0][1:])
        longtitude: float = float(location_info[1])

        location_name: str = ""
        for encoded_place_name in encoded_place_names:
            if location_name == "":
                location_name += unquote(encoded_place_name)
                continue

            location_name += f" {unquote(encoded_place_name)}"

        return location_name, latitude, longtitude

    def get_basic_place_info(self, url: str) -> dict:
        name, latitude, longtitude = self._parse_url(url=url)
        place_info: dict[str] = self.gmaps_client.places(query=name, location=(latitude, longtitude))
        place_id: str = place_info["results"][0]["place_id"]

        basic_info: dict = {
            "id": place_id,
            "lattitude": latitude,
            "longtitude": longtitude,
        }

        return basic_info

    def get_detailed_place_info(self, id: str) -> dict:
        place_detailed_info: dict = self.gmaps_client.place(place_id=id, language="ja")

        return place_detailed_info

    def search_nearby_places(
        self, location: tuple[float, float], radius: int, types: list[str], keyword: str, lang: str
    ) -> list[dict]:
        search_params = {
            "location": location,
            "radius": radius,  # 検索半径 (メートル単位),
            "type": types,
            "keyword": keyword,
            "language": lang,
        }
        nearby_place_infos: list[dict] = self.gmaps_client.places_nearby(**search_params)

        return nearby_place_infos
