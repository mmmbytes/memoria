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
        embedding = get_text_embedding(data.message, "amazon.titan-embed-text-v1")
        if embedding:
            print(embedding)
            return {"message": "Received test embedding successfully."}
    except Exception as e:
        print(f"Error: {e}")
        return {"message": "An error occurred."}
