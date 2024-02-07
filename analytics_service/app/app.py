from typing import List

from fastapi import FastAPI

from app.schemas.note_schemas import Note

app = FastAPI()

@app.post("/notes_similarity")
async def notes_similarity(data: List[Note]):
    print(data)
    return {"message": "Data received successfully!"}
