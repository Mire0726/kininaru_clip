from src.maps.places import nearby_simirary_search
from src.schema.recommend import recommednResponse, recommendItem
from src.services.summary import summarize_map_info_by_place_id
from src.utils.ranking import calculate_rrf_rankings


def recommend(url: str) -> recommednResponse:
    search_formatted_result = nearby_simirary_search(url)
    rrf_rank_list = calculate_rrf_rankings(search_formatted_result, top_n=2)
    recommend_items = []

    for rrf_rank in rrf_rank_list:
        res = summarize_map_info_by_place_id(rrf_rank["place_id"])
        item = recommendItem(name=rrf_rank["name"], content=res["summary"])
        recommend_items.append(item)

    return recommednResponse(recommends=recommend_items)
