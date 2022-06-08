from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base

db_path = "wordle.db"

engine = create_engine(f"sqlite:///{db_path}", echo=True)
Base = declarative_base()


class Word(Base):
    __tablename__ = "word"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    word = Column("word", String(5))


if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
