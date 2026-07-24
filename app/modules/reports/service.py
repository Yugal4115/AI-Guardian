from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.reports.models import Report
from app.exceptions import NotFoundException

class ReportService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def generate_report(self, title: str, report_type: str, user_id: UUID, filters: dict) -> Report:
        # Mock background generation of a report URL
        mock_pdf_url = f"https://gaurdian-reports-bucket.s3.amazonaws.com/exports/{report_type.lower()}-{user_id}.pdf"
        
        obj = Report(
            title=title,
            type=report_type,
            storage_url=mock_pdf_url,
            generated_by_id=user_id,
            metadata_payload={"filters": filters, "record_count": 42}
        )
        self.db.add(obj)
        await self.db.flush()
        return obj

    async def list_reports(self, user_id: UUID):
        result = await self.db.execute(
            select(Report)
            .filter(Report.generated_by_id == user_id, Report.deleted_at.is_(None))
            .order_by(Report.created_at.desc())
        )
        return list(result.scalars().all())
