import json
import os
from typing import Dict, List, Tuple
from urllib.parse import unquote, urlparse

import googlemaps
import requests
from dotenv import load_dotenv

from src.llm.llm import LLM
from src.schema.map import searchKyeword

load_dotenv()

GOOGLEMAP_API_KEY = os.environ.get("GOOGLEMAP_API_KEY")


def googlemap_url_parser(url: str) -> Tuple[str, float, float]:
    """
    url : GoogleMap URL

    Tuple[str, float, float] : location_name, latitude, longtiude
    """
    # short urlからlong urlへの変換。ただスクレイピングみたいな判定されて弾かれる。
    if len(url) < 100:
        response = requests.get(url)
        url = response.url

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


def get_place_info_for_summary(name: str, latitude: float, longtitude: float) -> Dict[str, str]:
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


def nearby_simirary_search(url: str, rad: int = 1500) -> List[Dict]:
    name, latitude, longtitude = googlemap_url_parser(url)
    info: Dict = get_place_info_for_summary(name, latitude, longtitude)
    prompt = """
            ### 指示
            INPUTは、あるユーザーが訪れたいと思っている場所のGoogleMap上の情報です。
            このINPUTを見て、同じような系統のお店を探すためのキーワードを教えてください。また、そのキーワードにより関連していると思われるINPUT内のtypesの項目を抜き出してください。
            キーワードに関しては、可能であれば、シンプルな一単語でお願いします。
            typesは最低限必要なものにしてください。

            ### INPUT
            <<INPUT>>
            """
    client = LLM(base="openai", model="gpt-4o-mini")
    prompt = prompt.replace("<<INPUT>>", str(info))
    client.set_prompt(prompt)
    res, _, _ = client.get_response(response_format=searchKyeword)
    # ここエラーハンドリング
    res_json = json.loads(res)

    gmaps = googlemaps.Client(key=GOOGLEMAP_API_KEY)
    params = {
        "location": (latitude, longtitude),
        "radius": rad,  # 検索半径 (メートル単位),
        "type": res_json["types"],
        "keyword": res_json["keyword"],
        "language": "ja",
    }
    nearby_places_result = gmaps.places_nearby(**params)

    use_kyes = [
        "place_id",
        "name",
        "rating",
        "user_ratings_total",
        # "url",
    ]

    search_formatted_result = []
    for content in nearby_places_result["results"]:
        use_info = {}
        for key in use_kyes:
            use_info[key] = content[key]

        search_formatted_result.append(use_info)

    return search_formatted_result


def get_url_by_place_id(place_id: str) -> str:
    gmaps_client: googlemaps.Client = googlemaps.Client(key=GOOGLEMAP_API_KEY)
    search_result = gmaps_client.place(place_id=place_id, language="ja")

    return search_result["result"]["url"]


if __name__ == "__main__":
    url = "https://www.google.co.jp/maps/place/%E6%9C%AD%E5%B9%8C%E5%B8%82%E6%99%82%E8%A8%88%E5%8F%B0/@43.0628859,141.3509121,17z/data=!4m6!3m5!1s0x5f0b297627507247:0x1b9ba84a4b04cdeb!8m2!3d43.0625768!4d141.3534928!16s%2Fm%2F0263ys5?entry=ttu&g_ep=EgoyMDI1MDIxMC4wIKXMDSoASAFQAw%3D%3D"
    place_info = get_place_info_for_summary(url)

    print(place_info)
