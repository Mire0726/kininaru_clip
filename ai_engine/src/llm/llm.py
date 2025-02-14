from src.llm.openai import OpenAILLM
from pathlib import Path
from typing import Dict, Any, List, Tuple


# LLMBaseを継承するべき？よくわからん
class LLM:
    def __init__(self, *, base: str, model: str):
        self.base: str = base
        self.model: str = model
        self.client = self.select_model()
        self.prompt: List[Dict[str, Any]] = None

    # ここもうちょいちゃんと実装する。エラーハンドリングとか
    # 他のモデルの追加
    # モデルマップ使って渡す。
    def select_model(self):
        if self.base == "openai":
            return OpenAILLM(model=self.model)

    # LLMBaseを継承するならcreate_queryにするべき？
    def set_prompt(self, text: str, image_path: str | Path = None) -> None:
        self.client.create_query(text=text, image_path=image_path)
        self.prompt = self.client.get_prompt()

    def get_prompt(self) -> List[Dict[str, Any]]:
        if self.prompt:
            return self.prompt
        else:
            # TODO: rasieしたい
            print("You should impliment set_prompt")
            return None

    def get_response(
        self,
        *,
        temperature=1.0,
        max_tokens=5000,
        top_p=1.0,
        frequency_penalty=0,
        presence_penalty=0,
    ) -> Tuple[str, int, int]:
        # エラー処理
        if not self.prompt:
            print("You should impliment set_prompt")
            return None

        response, input_tokens, output_tokens = self.client.get_response(
            temperature=temperature,
            max_tokens=max_tokens,
            top_p=top_p,
            frequency_penalty=frequency_penalty,
            presence_penalty=presence_penalty,
        )

        # 正規表現の処理は、関数として渡せるようにしたい。
        content: str = response.strip("`").strip()

        return content, input_tokens, output_tokens
