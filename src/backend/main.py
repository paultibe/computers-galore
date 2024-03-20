import os

from fastapi import FastAPI
from databases import Database
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# For local testing.
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

"""
    ! Message from Junsu
    For now, I belive we will not need to separate db connection, db CRUD operations, and the API routes into different files.
    Refactoring will not be necessary until we have a better understanding of the project structure, and refactoring should be very easy.
"""

DATABASE_URL = os.getenv("DATABASE_URL")
db = Database(DATABASE_URL)


@app.on_event("startup")
async def startup():
    await db.connect()

# TODO: Remove comment
# Sample Q - No users table yet
@app.get("/users")
async def get_users():
    q = """
        SELECT 
            * 
        FROM 
            users
        """
    return await db.fetch_all(q)

# TODO: Let's go


@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()
