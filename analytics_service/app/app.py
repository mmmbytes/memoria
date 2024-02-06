from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel, ValidationError
from app.services.text_embedding import get_text_embedding
from app.schemas.note_schemas import NotesList

app = FastAPI()

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"message": "Validation Error", "details": exc.errors()},
    )

@app.post("/notes_similarity")
async def notes_similarity(data: NotesList):
    print(data)
    return {"message": "Data received successfully!"}
