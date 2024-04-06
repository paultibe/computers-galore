from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

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
    "http://127.0.0.1:8000",
    "http://localhost:5173",
    "http://localhost:8000",
    "http://localhost:5173",
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
    return {"junsu and john": "are cracked programmers"}

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

@app.get("/getCountByBrand")
async def get_aggregation():
    query = """
    SELECT Brand, COUNT(*) 
    FROM Computer
    GROUP BY Brand
    """
    try:
        results = await db.fetch_all(query)
        return results
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while checking user: {str(e)}"
        )

@app.get("/getAvgPrice")
async def get_aggregation_having():
    query = """
    SELECT Brand, AVG(Price)
    FROM Computer
    GROUP BY Brand
    HAVING AVG(Price) > 2000
    """
    try:
        results = await db.fetch_all(query)
        return results
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while checking user: {str(e)}"
        )

@app.get("/getBestBrands")
async def get_aggregation_nested():
    query = """
    SELECT C.Brand, AVG(SR.Rating) AS AvgRating
    FROM Computer C, SatisfactionReview SR
    WHERE SR.ComputerId = C.Id
    GROUP BY C.Brand
    HAVING AVG(SR.Rating) > (
        SELECT AVG(Rating) 
        FROM SatisfactionReview)
    """
    try:
        results = await db.fetch_all(query)
        return results
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
    cpuBrands = cpuBrands.split("1")
    cpuBrands_query = ["'" + brand + "'" for brand in cpuBrands]
    cpuBrands = ", ".join(cpuBrands_query)
    gpuBrands = gpuBrands.split("1")
    gpuBrands_query = ["'" + brand + "'" for brand in gpuBrands]
    gpuBrands = ", ".join(gpuBrands_query)


    filter_query = """
    SELECT C.Id, C.Brand, C.Price, C.AssembledIn
    FROM Computer C
    JOIN Cpu ON C.CpuId = Cpu.Id
    JOIN Gpu ON C.GpuId = Gpu.Id
    JOIN CpuBrand ON Cpu.Model = CpuBrand.Model
    WHERE 
        CpuBrand.Brand IN ({})
        AND Cpu.CoreCount BETWEEN {} AND {}
        AND Gpu.Brand IN ({})
        AND Gpu.Memory BETWEEN {} AND {} ; 
    """.format(cpuBrands, minCpuCoreCount, maxCpuCoreCount, gpuBrands, minGpuMemory, maxGpuMemory)


    try:
        results = await db.fetch_all(query=filter_query )
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
        else:
            print("No results found.")
        return formatted_results
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while filtering computers: {str(e)}"
        )

@app.get("/getCpuByComputer/{id}") 
async def get_cpu_by_computer(id: int):
    query = """
    SELECT c2.*
    FROM Computer c, Cpu c2
    WHERE c.CpuId = c2.Id AND c.Id = :id
    """
    try:
        results = await db.fetch_all(query, values={"id": id})
        if results is None:
            raise HTTPException(status_code=404, detail="Computer not found")
        return results
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occured when geting CPU information: {str(e)}"
        )

@app.get("/getAllTables") 
async def get_all_tables():
    query = """
    SHOW TABLES 
    """
    try:
        results = await db.fetch_all(query)
        return results
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occured when geting all tables: {str(e)}"
        )
        
@app.get("/getTuplesByAttributes/{tableName}")
async def get_tuples_by_attributes(tableName: str, attributes: Optional[str] = None):
    if attributes:
        attribute_list = attributes.split(',')
        validated_attributes = ",".join(attribute_list)
    else:
        validated_attributes = "*"
    
    query = f"SELECT {validated_attributes} FROM {tableName}"
    
    try:
        results = await db.fetch_all(query)
        return results
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred when getting tuples by attributes: {str(e)}"
        )

class Computer(BaseModel):
    brand: str
    price: float
    assembledIn: str
    cpuModel: str
    cpuBrand: str
    cpuClockSpeed: float
    cpuGeneration: int
    cpuCoreCount: int
    gpuBrand: str
    gpuModel: str
    gpuMemory: int
    gpuClockSpeed: float

# Note that Storage and Monitors are fixed
@app.post("/addComputer")
async def addComputer(computerData: Computer):
    print(f"Computer addition request received...{computerData.dict()}")
    # Check for duplicate cpu brand
    cpu_brand_duplicate_query = "SELECT * FROM CpuBrand WHERE Model = :model"
    try:
      cpu_brand = await db.fetch_one(query=cpu_brand_duplicate_query, values={"model": computerData.cpuModel})
      if not cpu_brand:
          cpu_brand_query = "INSERT INTO CpuBrand (Model, Brand) VALUES (:model, :brand)"
          await db.execute(query=cpu_brand_query, values={"model": computerData.cpuModel, "brand": computerData.cpuBrand})
      
      # Check for duplicate cpu
      cpu_duplicate_query = """
      SELECT Id FROM Cpu 
      WHERE Model = :model AND 
      ClockSpeed = :clock_speed AND
      CoreCount = :core_count AND
      Generation = :generation
      """
      cpu_id = await db.fetch_one(query=cpu_duplicate_query, values={"model":computerData.cpuModel, "clock_speed": computerData.cpuClockSpeed, "core_count": computerData.cpuCoreCount, "generation": computerData.cpuGeneration})
      if not cpu_id:
          cpu_query = "INSERT INTO Cpu (Model, ClockSpeed, CoreCount, Generation) VALUES (:model, :clock_speed, :core_count, :generation)"
          await db.execute(query=cpu_query, values={"model":computerData.cpuModel, "clock_speed": computerData.cpuClockSpeed, "core_count": computerData.cpuCoreCount, "generation": computerData.cpuGeneration})
          cpu_id = await db.execute("SELECT LAST_INSERT_ID();")
      #cpu_id = await db.fetch_one(query=cpu_duplicate_query, values={"model":computerData.cpuModel, "clock_speed": computerData.cpuClockSpeed, "core_count": computerData.cpuCoreCount, "generation": computerData.cpuGeneration})

      # Check for duplicate gpu
      gpu_duplicate_query = """
      SELECT Id FROM Gpu 
      WHERE Brand = :brand AND 
      Model = :model AND
      Memory = :memory AND
      ClockSpeed = :clock_speed 
      """
      gpu_id = await db.fetch_one(query=gpu_duplicate_query, values={"model":computerData.gpuModel, "clock_speed": computerData.gpuClockSpeed, "brand": computerData.gpuBrand, "memory": computerData.gpuMemory})
      if not gpu_id:
          gpu_query = "INSERT INTO Gpu (Brand, Model, Memory, ClockSpeed) VALUES (:brand, :model, :memory, :clock_speed)"
          await db.execute(query=gpu_query,  values={"model":computerData.gpuModel, "clock_speed": computerData.gpuClockSpeed, "brand": computerData.gpuBrand, "memory": computerData.gpuMemory})
          gpu_id = await db.execute("SELECT LAST_INSERT_ID();")
      #gpu_id = await db.fetch_one(query=gpu_duplicate_query, values={"model":computerData.gpuModel, "clock_speed": computerData.gpuClockSpeed, "brand": computerData.gpuBrand, "memory": computerData.gpuMemory})
      
      # Check for duplicate computer
      computer_duplicate_query = """
      SELECT Id FROM Computer 
      WHERE Brand = :brand AND 
      Price = :price AND
      AssembledIn = :assembled_in AND
      CpuId = :cpu_id AND 
      GpuId = :gpu_id AND 
      StorageId = 1 AND
      MonitorId = 1
      """
      computer_id = await  db.fetch_one(query=computer_duplicate_query, 
                                        values={"brand":computerData.brand, "price": computerData.price, 
                                                "assembled_in": computerData.assembledIn, "cpu_id": cpu_id, "gpu_id": gpu_id})
      if not computer_id:
          computer_query = "INSERT INTO Computer (Brand, Price, AssembledIn, CpuId, GpuId, StorageId, MonitorId) VALUES (:brand, :price, :assembled_in, :cpu_id, :gpu_id, 1, 1)"
          await db.execute(query = computer_query, values={"brand":computerData.brand, "price": computerData.price, 
                                                "assembled_in": computerData.assembledIn, "cpu_id": cpu_id, "gpu_id": gpu_id})
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while adding computer: {str(e)}"
        )


class Review(BaseModel):
    review_type: str
    description: str
    rating: int


@app.post("/userWroteAllReviews")
async def get_user_wrote_all_reviews(user_email: UserEmail):
    email = user_email.email
    division_query = \
        """
    SELECT * FROM User U
    WHERE U.Email = :email AND NOT EXISTS (
        (SELECT 'Performance' AS review_type 
         UNION 
         SELECT 'Satisfaction' 
         UNION 
         SELECT 'Design') 

        EXCEPT

        (SELECT 'Performance' 
         FROM PerformanceReview PR 
         WHERE PR.UserId = U.Id

         UNION 

         SELECT 'Satisfaction' 
         FROM SatisfactionReview SR 
         WHERE SR.UserId = U.Id

         UNION 

         SELECT 'Design' 
         FROM DesignReview DR 
         WHERE DR.UserId = U.Id)
    );
    """

    try:
        user = await db.fetch_one(query=division_query, values={"email": email})
        if user:
            return JSONResponse(content={"hasWrittenAllReviews": True})
        else:
            return JSONResponse(content={"hasWrittenAllReviews": False})
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"An error occurred: {str(e)}"
        )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, log_level="info")
