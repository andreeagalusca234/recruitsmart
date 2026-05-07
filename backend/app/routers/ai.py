from fastapi import APIRouter

from app.schemas import ParseJobRequest, ParseJobResponse

router = APIRouter(prefix="/ai", tags=["ai stubs"])


@router.get("/daily-targets")
def generate_daily_targets() -> dict[str, list[dict[str, object]]]:
    return {
        "targets": [
            {
                "name": "Oliver Wyman",
                "tier": "DREAM",
                "fit_score": 88,
                "rationale": "Strong London strategy profile and MBA-relevant hiring signal.",
            },
            {
                "name": "Strategy&",
                "tier": "TARGET",
                "fit_score": 81,
                "rationale": "Good bridge into corporate strategy and transformation work.",
            },
        ]
    }


@router.post("/parse-job", response_model=ParseJobResponse)
def parse_job_description(payload: ParseJobRequest) -> ParseJobResponse:
    del payload
    return ParseJobResponse(
        fit_score=78,
        extracted_skills=["case problem solving", "stakeholder management", "market sizing"],
        gaps=["Add one quantified transformation story", "Strengthen sector-specific examples"],
    )


@router.get("/action-plan/{company_id}")
def generate_action_plan(company_id: str) -> dict[str, list[str]]:
    del company_id
    return {
        "checklist_items": [
            "Map two LBS alumni in the London office",
            "Draft a sector-specific why consulting answer",
            "Complete one case drill focused on profitability",
        ]
    }
