from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

from app.core.config import settings
from app.models import FileAsset, FileKind


@dataclass(frozen=True)
class StoredObject:
    storage_backend: str
    storage_key: str
    bucket: str | None
    size_bytes: int


def _safe_extension(filename: str) -> str:
    suffix = Path(filename).suffix.lower()
    if len(suffix) > 12:
        return ""
    return suffix if suffix.replace(".", "").isalnum() else ""


def _make_storage_key(file_kind: FileKind, filename: str) -> str:
    extension = _safe_extension(filename)
    return f"{file_kind.value.lower()}/{uuid4().hex}{extension}"


class LocalStorageBackend:
    def __init__(self, root_dir: str) -> None:
        self.root_dir = Path(root_dir).resolve()
        self.root_dir.mkdir(parents=True, exist_ok=True)

    async def save(self, file: UploadFile, file_kind: FileKind) -> StoredObject:
        key = _make_storage_key(file_kind, file.filename or "upload")
        target = (self.root_dir / key).resolve()
        if not str(target).startswith(str(self.root_dir)):
            raise ValueError("Invalid storage path")

        target.parent.mkdir(parents=True, exist_ok=True)
        content = await file.read()
        target.write_bytes(content)
        return StoredObject(
            storage_backend="local",
            storage_key=key,
            bucket=None,
            size_bytes=len(content),
        )

    def path_for(self, asset: FileAsset) -> Path:
        path = (self.root_dir / asset.storage_key).resolve()
        if not str(path).startswith(str(self.root_dir)):
            raise ValueError("Invalid storage path")
        return path


class S3StorageBackend:
    def __init__(self) -> None:
        if not settings.s3_bucket:
            raise ValueError("S3_BUCKET is required when STORAGE_BACKEND=s3")
        if not settings.s3_access_key_id or not settings.s3_secret_access_key:
            raise ValueError("S3 credentials are required when STORAGE_BACKEND=s3")

        import boto3

        self.bucket = settings.s3_bucket
        self.client = boto3.client(
            "s3",
            region_name=settings.s3_region,
            endpoint_url=settings.s3_endpoint_url,
            aws_access_key_id=settings.s3_access_key_id,
            aws_secret_access_key=settings.s3_secret_access_key,
        )

    async def save(self, file: UploadFile, file_kind: FileKind) -> StoredObject:
        key = _make_storage_key(file_kind, file.filename or "upload")
        content = await file.read()
        self.client.put_object(
            Bucket=self.bucket,
            Key=key,
            Body=content,
            ContentType=file.content_type or "application/octet-stream",
        )
        return StoredObject(
            storage_backend="s3",
            storage_key=key,
            bucket=self.bucket,
            size_bytes=len(content),
        )

    def presigned_download_url(self, asset: FileAsset, expires_seconds: int = 300) -> str:
        return self.client.generate_presigned_url(
            "get_object",
            Params={"Bucket": asset.bucket or self.bucket, "Key": asset.storage_key},
            ExpiresIn=expires_seconds,
        )


class StorageService:
    def __init__(self) -> None:
        backend = settings.storage_backend.lower()
        if backend == "local":
            self.backend = LocalStorageBackend(settings.local_storage_dir)
        elif backend == "s3":
            self.backend = S3StorageBackend()
        else:
            raise ValueError(f"Unsupported storage backend: {settings.storage_backend}")

    async def save(self, file: UploadFile, file_kind: FileKind) -> StoredObject:
        return await self.backend.save(file, file_kind)

    def local_path(self, asset: FileAsset) -> Path:
        if not isinstance(self.backend, LocalStorageBackend):
            raise ValueError("Local file path is only available for local storage")
        return self.backend.path_for(asset)

    def download_url(self, asset: FileAsset) -> str:
        if not isinstance(self.backend, S3StorageBackend):
            raise ValueError("Presigned URL is only available for S3 storage")
        return self.backend.presigned_download_url(asset)


def get_storage_service() -> StorageService:
    return StorageService()
