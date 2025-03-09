from abc import ABC, abstractmethod

from domain.model.recommend import RecommendItem
from domain.repository.google_map import GoogleMapRepository
from domain.repository.llm import LLMRepository
from ml.llm.schema import PlaceKeyword
from services.summary import SummaryServices


class RecommendUsecase(ABC):
    def __init__(self, llm: LLMRepository, google_map: GoogleMapRepository, summary_services: SummaryServices):
        self.llm: LLMRepository = llm
        self.google_map: GoogleMapRepository = google_map
        self.summary_services: SummaryServices = summary_services

    @abstractmethod
    def inference(self, url: str, radius: int) -> list[RecommendItem]:
        pass


class Recommend(RecommendUsecase):
    def _get_place_keyword(self, place_info: dict) -> str:
        prompt: str = """
            ### 指示
            INPUTは、あるユーザーが訪れたいと思っている場所のGoogleMap上の情報です。
            このINPUTを見て、同じような系統のお店を探すためのキーワードを教えてください。また、そのキーワードにより関連していると思われるINPUT内のtypesの項目を抜き出してください。
            キーワードに関しては、可能であれば、シンプルな一単語でお願いします。
            typesは最低限必要なものにしてください。

            ### INPUT
            <<INPUT>>
            """
        prompt = prompt.replace("<<INPUT>>", str(place_info))
        response: PlaceKeyword = self.llm.get_response(prompt=prompt, respons_format=PlaceKeyword)

        return response["keyword"]

    def _format_for_rerank(self, place_infos: list[dict]) -> list[dict]:
        use_kyes: list[str] = [
            "place_id",
            "name",
            "rating",
            "user_ratings_total",
        ]

        formatted_infos = []
        for content in place_infos["results"]:
            use_info = {}
            for key in use_kyes:
                use_info[key] = content[key]

            formatted_infos.append(use_info)

        return formatted_infos

    def _calculate_rrf_rankings(self, data: list[dict], k: int = 50, top_n: int = 5):
        """
        辞書のリストからRRFを使用してランキングを計算し、上位N件を返します。

        Args:
            data (list of dict): ランキング対象の辞書のリスト。
            k (int): RRFのパラメータ (デフォルト: 60)。
            top_n (int): 返却する上位N件の数 (デフォルト: 5)。

        Returns:
            list of dict: RRFでランキングされた上位N件の辞書のリスト。
        """

        if not data:
            return []

        # 1. ランキングリストの作成 (rating, user_ratings_total)
        ranked_by_rating = sorted(data, key=lambda x: x.get("rating") or 0, reverse=True)
        ranked_by_user_ratings_total = sorted(data, key=lambda x: x.get("user_ratings_total") or 0, reverse=True)

        # 2. RRFスコアの計算
        rrf_scores = {}
        for item in data:
            place_id = item["place_id"]
            rrf_scores[place_id] = 0

        # ratingの方を少し高めに補正
        for rank, item in enumerate(ranked_by_rating):
            place_id = item["place_id"]
            rrf_scores[place_id] += 1.3 / (k + rank + 1)  # +1 は順位を1始まりにするため

        # totalの方を小さめに補正　チェーン店を省きたい。
        for rank, item in enumerate(ranked_by_user_ratings_total):
            place_id = item["place_id"]
            rrf_scores[place_id] += 0.8 / (k + rank + 1)  # +1 は順位を1始まりにするため

        # 3. RRFスコアによるランキング
        ranked_by_rrf = sorted(data, key=lambda x: rrf_scores[x["place_id"]], reverse=True)

        # 4. 上位N件の抽出
        return ranked_by_rrf[:top_n]

    def _make_response(self, place_infos: list[dict]) -> list[RecommendItem]:
        recommend_items: list[RecommendItem] = []
        for place_info in place_infos:
            id: str = place_info["place_id"]
            summary: str = self.summary_services.create(id=id)
            # TODO: summary作成時とURL取得のために、同じリクエストを2回してる。改善したい。
            url: str = self.google_map.get_detailed_place_info(id=id)["result"]["url"]
            item: RecommendItem = RecommendItem(
                name=place_info["name"],
                url=url,
                content=summary,
            )
            recommend_items.append(item)

        return recommend_items

    def inference(self, url: str, radius: int) -> list[RecommendItem]:
        basic_info: dict = self.google_map.get_basic_place_info(url=url)
        id: str = basic_info.get("id")
        place_info: dict = self.google_map.get_detailed_place_info(id=id)
        keyword: str = self._get_place_keyword(place_info=place_info)

        nearby_place_infos: list[dict] = self.google_map.search_nearby_places(
            location=(basic_info["lattitude"], basic_info["longtitude"]),
            radius=radius,
            types=place_info["result"]["types"],
            keyword=keyword,
            lang="ja",
        )

        formatted_nearby_place_infos: list[dict] = self._format_for_rerank(nearby_place_infos)

        reranked_infos: list[dict] = self._calculate_rrf_rankings(data=formatted_nearby_place_infos, top_n=2)

        return self._make_response(place_infos=reranked_infos)
