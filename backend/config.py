from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    TELEGRAM_TOKEN: str
    CHAT_ID: int

    class Config:
        env_file = "backend/.env"

settings = Settings()
print(settings.TELEGRAM_TOKEN) 
print(settings.CHAT_ID)
