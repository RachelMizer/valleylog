from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    secret_key: str
    database_url: str = "sqlite:///./valleylog.db"
    access_token_expire_minutes: int = 60
    algorithm: str = "HS256"
    cors_origins: str = "http://localhost:5173"
    frontend_base_url: str = "http://localhost:8765"

    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_username: str | None = None
    smtp_password: str | None = None
    smtp_from_email: str | None = None

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]


settings = Settings()
