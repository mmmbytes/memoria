from fastapi import FastAPI
from pydantic import BaseModel
from services.text_embedding import get_text_embedding

app = FastAPI()

class MessageData(BaseModel):
    message: str

@app.post("/test-message")
async def test_message(data: MessageData):
    print(f"Message received: {data.message}")
    return {"message": "Received test"}
