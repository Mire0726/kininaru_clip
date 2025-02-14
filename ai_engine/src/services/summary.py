import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

import json
import logging

from dotenv import load_dotenv

from src.llm.llm import LLM
from src.maps.places import get_place_info_for_summary
from src.schema.summary import SummaryResponse

load_dotenv()

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(filename)s:%(lineno)d - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)


def summarize_map_info(url: str, debug: bool = False) -> str:
    place_info = get_place_info_for_summary(url)

    prompt = """
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
            - 評価：

            この文章をsummaryをキーとするjsonで生成してください。
            OUTPUT FORMAT自体は、全体で文章にしてください。
            また、評価は「白黒」の星を使って視覚的にもわかりやすいようにしてください。
            """

    client = LLM(base="openai", model="gpt-4o-mini")
    prompt = prompt.replace("<<INPUT>>", str(place_info))
    client.set_prompt(prompt)

    if debug:
        logger.debug(client.prompt)

    res, _, _ = client.get_response(response_format=SummaryResponse)
    res_json = json.loads(res)

    return res_json


if __name__ == "__main__":
    url = "https://www.google.co.jp/maps/place/%E6%9C%AD%E5%B9%8C%E5%B8%82%E6%99%82%E8%A8%88%E5%8F%B0/@43.0628859,141.3509121,17z/data=!4m6!3m5!1s0x5f0b297627507247:0x1b9ba84a4b04cdeb!8m2!3d43.0625768!4d141.3534928!16s%2Fm%2F0263ys5?entry=ttu&g_ep=EgoyMDI1MDIxMC4wIKXMDSoASAFQAw%3D%3D"
    res = summarize_map_info(url)

    print(res)
