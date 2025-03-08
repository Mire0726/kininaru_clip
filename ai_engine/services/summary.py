from abc import ABC, abstractmethod
from textwrap import dedent

from domain.repository.google_map import GoogleMapRepository
from domain.repository.llm import LLMRepository
from domain.model.summary import SummaryResponse

class SummaryServices(ABC):
    def __init__(self, llm: LLMRepository, google_map: GoogleMapRepository):
        self.llm: LLMRepository = llm
        self.google_map: GoogleMapRepository = google_map

    @abstractmethod
    def exec(self, url: str) -> str:
        pass

class Summarizer(SummaryServices):
    def _format_place_info(self, url: str) -> dict:
        place_info: dict = self.google_map.get_place_info(url=url)

        fomatted_place_info: dict = {}
        fomatted_place_info["name"] = place_info["result"].get("name")
        fomatted_place_info["types"] = place_info["result"].get("types")
        fomatted_place_info["rating"] = place_info["result"].get("rating")
        fomatted_place_info["reviews"] = place_info["result"].get("reviews", [])[:5]

        return fomatted_place_info
    
    def _display_star_by_rating(self, rating: float) -> str:
        if not 0 <= rating <= 5:
            return "評価値は0～5の範囲で入力してください。"

        rounded_value = round(rating)  # 四捨五入
        filled_stars = "★" * rounded_value
        empty_stars = "☆" * (5 - rounded_value)
        return f"\n - 評価：{filled_stars + empty_stars} ({rating}/5)"
    
    def exec(self, url: str) -> str:
        place_info: dict = self._format_place_info(url=url)

        # promptはテキストファイルからの読み込みに変更する。
        prompt: str = """
            ### 指示
            INPUTの内容を見て、SITUATIONに合わせた、OUTPUT FORMATのようなまとめを作ってください。

            ### SITUATION
            - 友達との旅行の行きたいリストの共有で、どんな店か簡単に理解するためのまとめ。
            - プライベートでの友達や家族との使用です。その状況を考慮して、カジュアルな感じでお願いします。
            - 一つ一つは端的な短めな文章でお願いします。

            ### INPUT
            <<INPUT>>

            ### OUTPUT FORMAT
            - ジャンル：
            - 雰囲気：
            - おすすめ：

            この文章をsummaryをキーとするjsonで生成してください。
            OUTPUT FORMAT自体は、全体で文章にしてください。
            """
        
        res: str = self.llm.get_resoponse(prompt=prompt, respons_format=SummaryResponse)

        rating: float = float(place_info["rating"])
        summary: str = res + self._display_star_by_rating(rating=rating)

        return summary
        
