from fastapi import APIRouter, Depends, HTTPException, Path
from sqlmodel import Session, select
from app.models import Project
from app.database import engine
from app.schemas import ProjectCreate

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

# post: add
@router.post("/", response_model=Project)
async def create_project(
    project: ProjectCreate,
    session: Session = Depends(get_session)
):
    db_project = Project(**project.dict())  # 转成数据库模型对象
    session.add(db_project)
    session.commit()
    session.refresh(db_project)  # 让它拿到 id
    return db_project

# put: update
@router.put("/{project_id}", response_model=Project)
async def update_project(
    project_id: int = Path(..., description="The ID of the project to update"),
    updated_project: ProjectCreate = ...,  # 仍然复用 ProjectCreate 模型
    session: Session = Depends(get_session)
):
    # 1. 查询要修改的项目
    db_project = session.get(Project, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")

    # 2. 更新字段
    db_project.name = updated_project.name
    db_project.description = updated_project.description

    # 3. 提交保存
    session.add(db_project)
    session.commit()
    session.refresh(db_project)

    return db_project