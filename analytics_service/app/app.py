from fastapi import FastAPI
from pydantic import BaseModel
from text_embedding import get_text_embedding

app = FastAPI()

class MessageData(BaseModel):
    message: str

@app.post("/test-message")
async def test_message(data: MessageData):
    print(f"Message received: {data.message}")
    try:
        vector = get_text_embedding(data.message, "amazon.titan-embed-text-v1")
        print(vector)
        return {"message": "Received test"}
    except Exception as e:
        print(f"Error retrieving text embedding: {e}")
        raise e
