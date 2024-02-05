from pydantic import BaseModel, Field
from typing import List
from pymongo import ObjectId

class PyObjectID(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError(f'Invalid ObjectId: {v}')
        return str(v)

class Note(BaseModel):
    _id: PyObjectID = Field(..., alias='id')
    textbody: str

class NotesList(BaseModel):
    notes: List[Note]
