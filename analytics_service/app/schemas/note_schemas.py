from pydantic import BaseModel, Field
from typing import List
from pydantic-mongo import ObjectIdField

class Note(BaseModel):
    id: ObjectIdField = Field(alias="_id")
    textbody: str

class NotesList(BaseModel):
    notes: List[Note]
