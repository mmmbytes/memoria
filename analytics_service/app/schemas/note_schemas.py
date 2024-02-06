from pydantic import BaseModel, Field
from typing import List

class Note(BaseModel):
    id: str = Field(alias='_id')
    textbody: str
