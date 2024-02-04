from fastapi import FastAPI
from pydantic import BaseModel
from app.services.text_embedding import get_text_embedding

app = FastAPI()

class MessageData(BaseModel):
    message: str

@app.post("/test-message")
async def test_message(data: MessageData):
    print(f"Message received: {data.message}")
    embedding = get_text_embedding(data.message, "amazon.titan-embed-text-v1")
    print(embedding)
    return {"message": "Received test"}
