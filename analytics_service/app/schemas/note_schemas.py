from pydantic import BaseModel

class Note(BaseModel):
    id: str 
    textbody: str

  