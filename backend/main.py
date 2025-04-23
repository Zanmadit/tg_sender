from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

from config import settings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

@app.post("/send")
def send_message(data: ContactForm):
    text = f"""
Новая заявка:
👤 Имя: {data.name}
Email: {data.email}
Сообщение: {data.message}
"""
    url = f"https://api.telegram.org/bot{settings.TELEGRAM_TOKEN}/sendMessage"
    response = requests.post(url, data={"chat_id": settings.CHAT_ID, "text": text})
    return {"success": response.ok}
