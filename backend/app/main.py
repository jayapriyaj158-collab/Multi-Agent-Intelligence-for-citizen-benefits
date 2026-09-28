import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.database import engine, Base
from app.routers import auth, profile, schemes, ai, documents, applications, notifications, support, admin
from app.agents.rag_engine import rag_engine

# Initialize Base tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Multi-Agent Intelligence for Citizen Benefits — Autonomous AI Platform",
    version="1.0.0",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static uploaded files directory
os.makedirs("./uploaded_documents", exist_ok=True)
app.mount("/static/uploads", StaticFiles(directory="./uploaded_documents"), name="uploads")

# Include Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(profile.router, prefix=settings.API_V1_STR)
app.include_router(schemes.router, prefix=settings.API_V1_STR)
app.include_router(ai.router, prefix=settings.API_V1_STR)
app.include_router(documents.router, prefix=settings.API_V1_STR)
app.include_router(applications.router, prefix=settings.API_V1_STR)
app.include_router(notifications.router, prefix=settings.API_V1_STR)
app.include_router(support.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)

@app.on_event("startup")
def startup_event():
    # Automatically execute seeding on initial boot
    try:
        from seed import seed_database
        seed_database()
    except Exception as e:
        print(f"Startup seed notice: {e}")

@app.get("/")
def root():
    return {
        "project": settings.PROJECT_NAME,
        "status": "ONLINE",
        "demo_mode": settings.DEMO_MODE,
        "ecosystem_layer": "Intelligent Orchestration above myScheme, UMANG, DigiLocker & State Portals",
        "api_docs": f"{settings.API_V1_STR}/docs"
    }

@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "service": "Citizen Benefit Intelligence Multi-Agent Engine",
        "rag_indexed": rag_engine.is_indexed,
        "rag_chunks_count": len(rag_engine.corpus_chunks)
    }
