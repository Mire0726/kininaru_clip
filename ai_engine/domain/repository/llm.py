from abc import ABC, abstractmethod

from pydantic import BaseModel


class LLMRepository(ABC):
    @abstractmethod
    def get_response(self, prompt: str, respons_format: BaseModel) -> BaseModel:
        pass
