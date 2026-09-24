from pydantic_settings import BaseSettings
from pathlib import Path


from logger import setup_logger


class Config(BaseSettings):

    SERVICE_NAME: str = "API"
    LOG_LEVEL: str = "DEBUG"
    LOG_DIR: Path = Path("logs")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

    def __init__(self):
        self.logger = setup_logger(self)



config = Config()
logger = setup_logger(config)