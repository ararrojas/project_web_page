import dataclasses
from dataclasses import dataclass

@dataclass
class UserDataMapper:
    name: str
    password: str
    email: str

    def to_dict() -> dict:
        data = dataclasses.asdict(self)
        return data

@dataclass
class LogInDataMapper:
    email: str
    password: str

    def to_dict() -> dict:
        data = dataclasses.asdict(self)
        return data