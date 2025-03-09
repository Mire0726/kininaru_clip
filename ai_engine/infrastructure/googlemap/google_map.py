import os
from urllib.parse import ParseResult, unquote, urlparse

from dotenv import load_dotenv
from googlemaps import Client

from domain.repository.google_map import GoogleMapRepository

load_dotenv()
GOOGLEMAP_API_KEY: str = os.environ.get("GOOGLEMAP_API_KEY")


class GoogleMap(GoogleMapRepository):
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
        gmaps_client: Client = Client(key=GOOGLEMAP_API_KEY)
        place_info: dict[str] = gmaps_client.places(query=name, location=(latitude, longtitude))
        place_id: str = place_info["results"][0]["place_id"]

        basic_info: dict = {
            "id": place_id,
            "lattitude": latitude,
            "longtitud": longtitude,
        }

        return basic_info

    def get_detailed_place_info(self, id: str) -> dict:
        gmaps_client: Client = Client(key=GOOGLEMAP_API_KEY)
        place_detailed_info: dict = gmaps_client.place(place_id=id, language="ja")

        return place_detailed_info
