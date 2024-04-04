from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

import uvicorn

from db import *

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

app = FastAPI()

# For local testing.
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://localhost:8000",
    "http://192.9.242.103:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

@app.on_event("startup")
async def startup():
    await connect_db()
    await init_tables()

@app.on_event("shutdown")
async def shutdown():
    await disconnect_db()

@app.get("/")
async def read_root():
    return {"Hello": "World"}

class UserSignup(BaseModel):
    name: str = Field(..., min_length=1, max_length=127)
    email: str = Field(..., min_length=1, max_length=127)

@app.post("/signup")
async def signup_user(user: UserSignup):
    print(f"User signup request received...{user.dict()}")
    # Check for duplicate email
    duplicate_check_query = "SELECT Id FROM User WHERE Email = :email"
    duplicate = await db.fetch_one(duplicate_check_query, values={"email": user.email})
    if duplicate:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists."
        )

    # Insert new user if email not found
    insert_query = """
    INSERT INTO User(Name, Email, FirstLoginDate)
    VALUES (:name, :email, :first_login_date)
    """
    values = {
        "name": user.name,
        "email": user.email,
        "first_login_date": datetime.utcnow()
    }
    try:
        await db.execute(query=insert_query, values=values)
        last_record_id = await db.execute("SELECT LAST_INSERT_ID();")
        print(f"User signed up successfully with ID: {last_record_id}")
        return {"id": last_record_id, **user.dict()}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while signing up: {str(e)}"
        )
class UserEmail(BaseModel):
    email: str

@app.post("/checkUserExists")
async def check_user(user_email: UserEmail): 
    email = user_email.email
    print(f"Checking if user exists with email: {email}")
    q = "SELECT Email FROM User WHERE Email = :email"

    try:
        user = await db.fetch_one(query=q, values={"email": email})
        if user:
            return {"exists": True}
        else:
            return {"exists": False}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while checking user: {str(e)}"
        )

@app.delete("/deleteUser")
async def delete_user(user_email: UserEmail):
    email = user_email.email
    delete_query = "DELETE FROM User WHERE Email = :email"
    
    try:
        await db.execute(query=delete_query, values={"email": email})
        return {"detail": "User deleted successfully."}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while deleting the user: {str(e)}"
        )
    
@app.get("/filterComputers/{cpuBrands}/{minCpuCoreCount}/{maxCpuCoreCount}/{gpuBrands}/{minGpuMemory}/{maxGpuMemory}")
async def filter_computers(cpuBrands: str, minCpuCoreCount: int, maxCpuCoreCount: int, gpuBrands: str, minGpuMemory: int, maxGpuMemory: int):
    # cpuBrands = cpuBrands.split(",")
    # gpuBrands = gpuBrands.split(",")
    
    filter_query = """
    SELECT C.Id, C.Brand, C.Price, BA.AssembledIn
    FROM Computer C
    JOIN Cpu ON C.CpuId = Cpu.Id
    JOIN Gpu ON C.GpuId = Gpu.Id
    JOIN CpuBrand ON Cpu.Model = CpuBrand.Model
    JOIN BrandAssembles BA on C.Brand = BA.Brand
    WHERE 
        CpuBrand.Brand IN (:cpuBrands)
        AND Cpu.CoreCount BETWEEN :minCpuCoreCount AND :maxCpuCoreCount
        AND Gpu.Brand IN (:gpuBrands)
        AND Gpu.Memory BETWEEN :minGpuMemory AND :maxGpuMemory ;
    """
    try:
        results = await db.execute(query=filter_query, values={"cpuBrands": cpuBrands, "minCpuCoreCount": minCpuCoreCount, "maxCpuCoreCount": maxCpuCoreCount, "gpuBrands": gpuBrands, "minGpuMemory": minGpuMemory, "maxGpuMemory": maxGpuMemory})
        formatted_results = []
        if results:
            for row in results:
                computer_data = {
                    'id': row[0],
                    'brand': row[1],
                    'price': row[2],
                    'assembledIn': row[3]
                }
                formatted_results.append(computer_data)
        return formatted_results
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while filtering computers: {str(e)}"
        )



if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, log_level="info")
