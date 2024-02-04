from fastapi import FastAPI
from pydantic import BaseModel
from services.test_import import test_import

app = FastAPI()

class MessageData(BaseModel):
    message: str

@app.post("/test-message")
async def test_message(data: MessageData):
    print(f"Message received: {data.message}")
    test_import()
    return {"message": "Received test"}
