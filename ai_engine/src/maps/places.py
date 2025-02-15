import os
from typing import Dict, List, Tuple
from urllib.parse import unquote, urlparse

import googlemaps
from dotenv import load_dotenv

load_dotenv()

GOOGLEMAP_API_KEY = os.environ.get("GOOGLEMAP_API_KEY")


def googlemap_url_parser(url: str) -> Tuple[str, float, float]:
    """
    url : GoogleMap URL

    Tuple[str, float, float] : location_name, latitude, longtiude
    """
    # short urlからlong urlへの変換。ただスクレイピングみたいな判定されて弾かれる。
    # response = requests.get(url, allow_redirects=False)
    # long_url = response.url

    parsed_url = urlparse(url)
    encoded_place_names: List[str] = parsed_url.path.split("/")[3].split("+")
    location_info = parsed_url.path.split("/")[4].split(",")
    latitude: float = float(location_info[0][1:])
    longtitude: float = float(location_info[1])

    location_name: str = ""
    for encoded_place_name in encoded_place_names:
        if location_name == "":
            location_name += unquote(encoded_place_name)
            continue

        location_name += f" {unquote(encoded_place_name)}"

    return location_name, latitude, longtitude


def get_place_info_for_summary(url: str) -> Dict[str, str]:
    name, latitude, longtitude = googlemap_url_parser(url)
    gmaps_client: googlemaps.Client = googlemaps.Client(key=GOOGLEMAP_API_KEY)
    place_result: Dict[str] = gmaps_client.places(query=name, location=(latitude, longtitude))
    place_id: str = place_result["results"][0]["place_id"]

    place_details_result = gmaps_client.place(place_id=place_id, language="ja")
    summary_info = {}
    summary_info["name"] = place_details_result["result"].get("name")
    summary_info["types"] = place_details_result["result"].get("types")
    summary_info["rating"] = place_details_result["result"].get("rating")
    summary_info["reviews"] = place_details_result["result"].get("reviews", [])[:5]

    return summary_info


if __name__ == "__main__":
    url = "https://www.google.co.jp/maps/place/%E6%9C%AD%E5%B9%8C%E5%B8%82%E6%99%82%E8%A8%88%E5%8F%B0/@43.0628859,141.3509121,17z/data=!4m6!3m5!1s0x5f0b297627507247:0x1b9ba84a4b04cdeb!8m2!3d43.0625768!4d141.3534928!16s%2Fm%2F0263ys5?entry=ttu&g_ep=EgoyMDI1MDIxMC4wIKXMDSoASAFQAw%3D%3D"
    place_info = get_place_info_for_summary(url)

    print(place_info)
