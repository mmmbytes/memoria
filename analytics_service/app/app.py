from typing import List

from fastapi import FastAPI

from app.schemas.note_schemas import Note
from app.services.notes_similarity_analyzer import find_notes_similarity

app = FastAPI()

@app.post("/notes_similarity")
async def notes_similarity(data: List[Note]):
    similarities = find_notes_similarity(data)
    print(similarities)
    return {"message": "Data received successfully!"}
