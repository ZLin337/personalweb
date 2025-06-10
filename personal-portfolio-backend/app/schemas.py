from sqlmodel import SQLModel

class ProjectCreate(SQLModel):
    name: str
    description: str
