from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import Base, engine, run_migrations
from app.routers import auth, recipes, tasks, villagers


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    run_migrations()
    yield


app = FastAPI(title="Valley Log API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(villagers.router)
app.include_router(tasks.router)
app.include_router(recipes.router)


@app.get("/health")
def health():
    return {"status": "ok"}
