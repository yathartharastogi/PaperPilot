import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import papers

app = FastAPI(
    title="PaperPilot API",
    description="AI Research Briefing Agent Backend — Grounded Citation Engine",
    version="1.0.0"
)

# CORS configuration for Next.js frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(papers.router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": "PaperPilot API",
        "version": "1.0.0",
        "mock_auth": os.getenv("MOCK_AUTH", "true"),
        "llm_provider": os.getenv("LLM_PROVIDER", "mock_local")
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
