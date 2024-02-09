from typing import List
from fastapi import FastAPI

from app.schemas.note_schemas import Note
from app.services.note_similarity_analyzer import find_notes_similarities

app = FastAPI()


@app.post("/note_similarities")
async def get_note_similarities(notes: List[Note]):
    try:
        note_similarities = find_note_similarities(notes)
        return {"noteSimilarities": note_similarities}
    except Exception as e:
        logging.error(f"Error finding note similarities: {e}")
        raise HTTPException(status_code=500, detail="Error finding note similarities")
