from typing import List

from pydantic import BaseModel

class Note(BaseModel):
    id: str 
    textbody: str

class NotesList(BaseModel):
    notes: List[Note]   
  