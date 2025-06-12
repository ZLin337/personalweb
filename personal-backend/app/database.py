from sqlmodel import SQLModel, create_engine, Session, select
from app.models import Project


# 连接字符串，后续正式部署可以放在 .env 里
DATABASE_URL = "sqlite:///./test.db"  # ✅ 目前先用本地SQLite（方便开发）

# 创建数据库引擎
engine = create_engine(DATABASE_URL, echo=True)

# 数据库初始化函数，后续在 main.py 中会调用
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    seed_initial_data()

def seed_initial_data():
    with Session(engine) as session:
        # 防止重复插入
        if not session.exec(select(Project)).first():
            project1 = Project(name="AI English Tutor", description="An AI-powered language learning platform.")
            project2 = Project(name="Pet Recognizer", description="Image recognition system for pets.")
            project3 = Project(name="Game Platform", description="Unity based game demo project.")
            session.add_all([project1, project2, project3])
            session.commit()