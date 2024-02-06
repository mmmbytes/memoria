from fastapi import FastAPI
from pydantic import BaseModel
from app.schemas.note_schemas import NotesList

app = FastAPI()

@app.post("/notes_similarity")
async def notes_similarity(data: NotesList):
    print(data)
    return {"message": "Data received successfully!"}
