from abc import ABC, abstractmethod


class LLMRepository(ABC):
    @abstractmethod
    def get_resoponse(prompt: str) -> str:
        pass
