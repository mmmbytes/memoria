from pydantic import BaseModel, Field
from typing import List
from bson.objectid import ObjectId

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
    id: PyObjectID = Field(..., alias='_id')
    textbody: str

class NotesList(BaseModel):
    notes: List[Note]
