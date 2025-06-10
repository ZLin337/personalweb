from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.models import Project
from app.database import engine

# 创建路由分组
router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


# 每次请求创建数据库会话
def get_session():
    with Session(engine) as session:
        yield session

# GET: 查询项目列表
@router.get("/")
async def get_projects(session: Session = Depends(get_session)):
    statement = select(Project)
    results = session.exec(statement).all()
    return results
