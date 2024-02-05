from pydantic import BaseModel, Field
from typing import List

class NoteID(BaseModel):
    oid: str = Field(..., alias='$oid')

class Note(BaseModel):
    id: NoteID
    textbody: str

class NotesList(BaseModel):
    notes: List[Note]
