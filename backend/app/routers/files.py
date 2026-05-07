from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse, RedirectResponse
from sqlmodel import Session, select

from app.db.session import get_session
from app.models import FileAsset, FileKind
from app.schemas import FileAssetRead
from app.services.storage import StorageService, get_storage_service

router = APIRouter(prefix="/files", tags=["files"])


@router.post("/upload", response_model=FileAssetRead)
async def upload_file(
    upload: UploadFile = File(...),
    file_kind: FileKind = Form(...),
    user_id: str = Form(...),
    company_id: str | None = Form(default=None),
    job_id: str | None = Form(default=None),
    session: Session = Depends(get_session),
    storage: StorageService = Depends(get_storage_service),
) -> FileAsset:
    stored = await storage.save(upload, file_kind)
    asset = FileAsset(
        user_id=user_id,
        company_id=company_id,
        job_id=job_id,
        file_kind=file_kind,
        original_filename=upload.filename or "upload",
        content_type=upload.content_type,
        size_bytes=stored.size_bytes,
        storage_backend=stored.storage_backend,
        storage_key=stored.storage_key,
        bucket=stored.bucket,
    )
    session.add(asset)
    session.commit()
    session.refresh(asset)
    return asset


@router.get("", response_model=list[FileAssetRead])
def list_files(
    user_id: str | None = None,
    file_kind: FileKind | None = None,
    session: Session = Depends(get_session),
) -> list[FileAsset]:
    statement = select(FileAsset).order_by(FileAsset.created_at.desc())
    if user_id:
        statement = statement.where(FileAsset.user_id == user_id)
    if file_kind:
        statement = statement.where(FileAsset.file_kind == file_kind)
    return list(session.exec(statement).all())


@router.get("/{file_id}/download")
def download_file(
    file_id: str,
    session: Session = Depends(get_session),
    storage: StorageService = Depends(get_storage_service),
):
    asset = session.get(FileAsset, file_id)
    if not asset:
        raise HTTPException(status_code=404, detail="File not found")

    if asset.storage_backend == "local":
        path = storage.local_path(asset)
        if not path.exists():
            raise HTTPException(status_code=404, detail="Stored file missing")
        return FileResponse(
            path,
            media_type=asset.content_type or "application/octet-stream",
            filename=asset.original_filename,
        )

    if asset.storage_backend == "s3":
        return RedirectResponse(storage.download_url(asset))

    raise HTTPException(status_code=400, detail="Unsupported storage backend")
