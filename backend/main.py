from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from crawler import extract_page
from analyzer import analyze_positioning_change


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    url: str
    old_positioning: str
    new_positioning: str


@app.get("/")
def root():
    return {"message": "Website Repositioning Copilot backend is running"}


@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    page_text = extract_page(request.url)

    if not page_text:
        return {
            "error": "Could not extract content from the provided URL."
        }

    result = analyze_positioning_change(
    page_text=page_text,
    old_positioning=request.old_positioning,
    new_positioning=request.new_positioning,
    page_url=request.url,
    )

    return {
        "url": request.url,
        "pages_analyzed": 1,
        "analysis": result,
    }