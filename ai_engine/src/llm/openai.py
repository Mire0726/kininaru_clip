import base64
from openai import OpenAI, ChatCompletion
from dotenv import load_dotenv
from src.llm.base import LLMBase
from typing import Dict, Any, List, Tuple
from pathlib import Path

load_dotenv()


class OpenAILLM(LLMBase):
    def __init__(self, model: str):
        client: OpenAI = OpenAI()
        self.prompt = {"role": "user"}
        super().__init__(model, client)

    # 返り値チェック
    def encode_image(self, image_path: str | Path):
        with open(image_path, "rb") as file:
            return base64.b64encode(file.read()).decode("utf-8")

    def create_text_prompt(self, text: str) -> Dict[str, Any]:
        return {"type": "text", "text": text}

    def create_image_prompt(self, image_path: str | Path) -> Dict[str, Any]:
        prompt_format: str = "data:image/jpeg;base64,<encode_image>"
        encode_image = self.encode_image(image_path)
        prompt_url: str = prompt_format.replace("<encode_image>", encode_image)

        return {"type": "image_url", "image_url": {"url": prompt_url}}

    def create_query(
        self, text: str = None, *, image_path: str | Path = None
    ) -> List[Dict[str, Any]]:
        prompt: List[Dict[str, Any]] = []
        text_prompt: Dict[str, Any] = self.create_text_prompt(text)
        prompt.append(text_prompt)

        if image_path:
            image_prompt: Dict[str, Any] = self.create_image_prompt(image_path)
            prompt.append(image_prompt)

        self.prompt["content"] = prompt

    def get_prompt(self) -> List[Dict[str, Any]]:
        return self.prompt

    def get_response(
        self,
        *,
        temperature=1.0,
        max_tokens=5000,
        top_p=1.0,
        frequency_penalty=0,
        presence_penalty=0,
        response_format=None,
    ) -> Tuple[str, int, int]:
        response: ChatCompletion = self.client.beta.chat.completions.parse(
            model=self.model,
            # ちょっとこれ雑
            messages=[self.prompt],
            temperature=temperature,
            max_tokens=max_tokens,
            top_p=top_p,
            frequency_penalty=frequency_penalty,
            presence_penalty=presence_penalty,
            response_format=response_format,
        )

        content: str = response.choices[0].message.content
        input_tokens: int = response.usage.prompt_tokens
        output_tokens: int = response.usage.completion_tokens

        return content, input_tokens, output_tokens
