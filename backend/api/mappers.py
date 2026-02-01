import dataclasses
from dataclasses import dataclass

@dataclass
class OverviewDataMapper:
    id: int
    name: str
    description: str
    image: str
    net_price: float
    price: float
    tax: int
    @staticmethod
    def to_overview_data_mapper(payload: dict) -> 'OverviewDataMapper':
        return OverviewDataMapper(
            id=payload.get('id'),
            name=payload.get('name'),
            description=payload.get('description'),
            image=payload.get('image'),
            net_price=payload.get('net_price'),
            price=payload.get('price'),
            tax=payload.get('taxes')
        )
    def to_dict(self) -> dict:
        data = dataclasses.asdict(self)
        return data

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