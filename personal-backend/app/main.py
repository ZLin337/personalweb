from fastapi import FastAPI
from app.routes import project
from app.database import create_db_and_tables
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 允许本地开发前端访问（端口是 5173）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 在启动时自动创建数据库表

@app.on_event("startup")
def on_startup():
    create_db_and_tables()


# 注册项目路由
app.include_router(project.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to My Personal Portfolio Backend!"}
