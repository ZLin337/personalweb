from fastapi import FastAPI
from app.routes import project
from app.database import create_db_and_tables

app = FastAPI()

# 在启动时自动创建数据库表
@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    
# 注册项目路由
app.include_router(project.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to My Personal Portfolio Backend!"}
