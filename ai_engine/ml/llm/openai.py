from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel

from domain.repository.llm import LLMRepository

load_dotenv()


class OpenAILLM(LLMRepository):
    def __init__(self):
        self.client: OpenAI = OpenAI()

    def _build_prompt(self, prompt: str) -> list[dict]:
        return [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                ],
            }
        ]

    def get_response(self, prompt: str, respons_format: BaseModel) -> str:
        message: list[dict] = self._build_prompt(prompt=prompt)
        response = self.client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=message,
            temperature=1,
            max_tokens=4096,
            top_p=1.0,
            frequency_penalty=0,
            presence_penalty=0,
            response_format=respons_format,
        )
        content: str = response.choices[0].message.content

        return content
