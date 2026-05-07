from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "RecruitSmart LBS API"
    database_url: str = "sqlite:///./recruitsmart.db"
    frontend_origin: str = "http://localhost:3000"
    storage_backend: str = "local"
    local_storage_dir: str = "./storage"
    s3_bucket: str | None = None
    s3_region: str = "auto"
    s3_endpoint_url: str | None = None
    s3_access_key_id: str | None = None
    s3_secret_access_key: str | None = None

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
