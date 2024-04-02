import os
from databases import Database
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

db = Database(DATABASE_URL)


async def connect_db():
    await db.connect()


async def disconnect_db():
    await db.disconnect()


async def init_tables():
    # Users
    create_users_sql = \
        """
        CREATE TABLE IF NOT EXISTS User (
            Id SERIAL PRIMARY KEY,
            Name VARCHAR(127),
            Email VARCHAR(127),
            FirstLoginDate DATETIME
        );
    """
    await db.execute(create_users_sql)

    # Premium Users
    create_premium_users_sql = \
        """
        CREATE TABLE IF NOT EXISTS PremiumUser (
            UserId BIGINT UNSIGNED,
            ExpiryDate DATETIME,
            FOREIGN KEY (UserId) REFERENCES User(Id)
        );
    """
    await db.execute(create_premium_users_sql)

    # Computer
    sql = \
        """
        CREATE TABLE IF NOT EXISTS Computer (
        Id SERIAL PRIMARY KEY,
        Brand VARCHAR(127),
        Price DECIMAL(5, 2) CHECK (Price BETWEEN 0.00 AND 999.99),
        AssembledIn VARCHAR(127),
        CpuId INT,
        GpuId INT,
        StorageId INT,
        MonitorId INT,
        FOREIGN KEY (CpuId) REFERENCES Cpu(Id),
        FOREIGN KEY (GpuId) REFERENCES Gpu(Id),
        FOREIGN KEY (StorageId) REFERENCES Storage(Id),
        FOREIGN KEY (MonitorId) REFERENCES Monitor(Id),
        FOREIGN KEY (Brand) REFERENCES BrandAssembles(Brand),
        );
    """
    await db.execute(sql)

    # Performance Review
    create_performance_review_sql = \
        """
        CREATE TABLE IF NOT EXISTS PerformanceReview (
            Id SERIAL PRIMARY KEY,
            Rating INT CHECK (Rating BETWEEN 1 AND 5),
            Description VARCHAR(2048),
            BenchMark DECIMAL(5, 2) CHECK (BenchMark BETWEEN 0.00 AND 999.99),
            UserId BIGINT UNSIGNED,
            ComputerId INT,
            Date DATETIME,
            FOREIGN KEY (UserId) REFERENCES User(Id),
            FOREIGN KEY (ComputerId) REFERENCES Computer(Id)
        );
    """
    await db.execute(create_performance_review_sql)

    # Design Review
    create_dr_sql = \
        """
        CREATE TABLE IF NOT EXISTS DesignReview (
        Id SERIAL PRIMARY KEY,
        Rating INT CHECK (Rating BETWEEN 1 AND 5),
        Description VARCHAR(2048),
        UserId BIGINT UNSIGNED,
        ComputerId INT,
        Date DATETIME,
        FOREIGN KEY (UserId) REFERENCES User(Id),
        FOREIGN KEY (ComputerId) REFERENCES Computer(Id)
        );
    """
    await db.execute(create_dr_sql)

    # Satisfaction Review
    sql = \
        """
        CREATE TABLE IF NOT EXISTS SatisfactionReview (
        Id SERIAL PRIMARY KEY,
        Rating INT CHECK (Rating BETWEEN 1 AND 5),
        Description VARCHAR(2048),
        UserId BIGINT UNSIGNED,
        ComputerId INT,
        Date DATETIME,
        FOREIGN KEY (UserId) REFERENCES User(Id),
        FOREIGN KEY (ComputerId) REFERENCES Computer(Id)
        );
    """
    await db.execute(sql)

    # Assembled In
    sql = \
        """
        CREATE TABLE IF NOT EXISTS AssembledIn (
        Brand VARCHAR(127) PRIMARY KEY,
        AssembledIn VARCHAR(127),
        );
    """
    await db.execute(sql)

    # Cpu
    sql = \
        """
        CREATE TABLE IF NOT EXISTS Cpu (
        Id SERIAL PRIMARY KEY,
        Model VARCHAR(127),
        ClockSpeed DECIMAL(5, 2) CHECK (ClockSpeed BETWEEN 0.00 AND 100.00),
        CoreCount INT,
        Generation INT,
        FOREIGN KEY (Model) REFERENCES CpuBrand(Model)
        );
    """
    await db.execute(sql)

    # Cpu Brand
    sql = \
        """
        CREATE TABLE IF NOT EXISTS CpuBrand (
    Model VARCHAR(127) PRIMARY KEY,
    Brand VARCHAR(127)
        );
    """
    await db.execute(sql)

    # Gpu
    sql = \
        """
        CREATE TABLE IF NOT EXISTS Gpu (
        Id SERIAL PRIMARY KEY,
        Brand VARCHAR(127),
        Model VARCHAR(127),
        Memory INT,
        ClockSpeed DECIMAL(3, 2),
        );
    """
    await db.execute(sql)

    # Storage
    sql = \
        """
        CREATE TABLE IF NOT EXISTS Storage (
        Id SERIAL PRIMARY KEY,
        Brand VARCHAR(127),
        Model VARCHAR(127),
        Capacity INT,
        Type CHAR(3) CHECK (Type IN ('HDD', 'SSD')),
        );
    """
    await db.execute(sql)

    # Monitor
    sql = \
        """
        CREATE TABLE IF NOT EXISTS Monitor (
        Id SERIAL PRIMARY KEY,
        Brand VARCHAR(127),
        Model VARCHAR(127),
        RefreshRate INT,
        Size DECIMAL(3, 1) CHECK (Size BETWEEN 0.0 AND 99.9),
        Resolution VARCHAR(16),
        );
    """
    await db.execute(sql)

    # Computer Store
    sql = \
        """
        CREATE TABLE IF NOT EXISTS ComputerStore (
        Address VARCHAR(255) PRIMARY KEY,
        Name VARCHAR(255),
        );
    """
    await db.execute(sql)

    # Sells
    sql = \
        """
        CREATE TABLE IF NOT EXISTS Sells (
        StoreAddress VARCHAR(255),
        ComputerId INT,
        FOREIGN KEY (StoreAddress) REFERENCES ComputerStore(Address),
        FOREIGN KEY (ComputerId) REFERENCES Computer(Id)
        );
    """
    await db.execute(sql)

    # Searches
    sql = \
        """
        CREATE TABLE IF NOT EXISTS Searches (
        UserId INT,
        ComputerId INT,
        FOREIGN KEY (UserId) REFERENCES User(Id),
        FOREIGN KEY (ComputerId) REFERENCES Computer(Id)
        );
    """
    await db.execute(sql)

    # Compares
    sql = \
        """
        CREATE TABLE IF NOT EXISTS Compares (
        UserId INT,
        ComputerIdOne INT,
        ComputerIdTwo INT,
        FOREIGN KEY (UserId) REFERENCES User(Id),
        FOREIGN KEY (ComputerIdOne) REFERENCES Computer(Id),
        FOREIGN KEY (ComputerIdTwo) REFERENCES Computer(Id)
        );
    """
    await db.execute(sql)

    # Endorses
    sql = \
        """
        CREATE TABLE IF NOT EXISTS Endorses (
        StoreAddress VARCHAR(255),
        ReviewId INT,
        FOREIGN KEY (StoreAddress) REFERENCES ComputerStore(Address),
        FOREIGN KEY (ReviewId) REFERENCES PerformanceReview(Id)
        );
    """
    await db.execute(sql)
