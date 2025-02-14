from abc import ABC, abstractmethod
from typing import Tuple
from pathlib import Path

class LLMBase(ABC):
    def __init__(self, model: str, client):
        self.model = model
        self.client = client

    @abstractmethod
    def create_query(self, text: str, image_path: str|Path) -> None:
        pass

    @abstractmethod
    def get_response(self) -> Tuple[str, int, int]:
        pass