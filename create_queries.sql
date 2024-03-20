/* The following queries are used to create the tables in the database.
 * Meticulous constraint checks are done for each attribute domain; 
 * however, we can remove this to be handled in the application logic. 
 * Left TODO for now.
 */

CREATE TABLE User (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(127),
    Email VARCHAR(127),
    FirstLoginDate DATETIME
);

CREATE TABLE PremiumUser (
    UserId INT,
    ExpiryDate DATETIME,
    FOREIGN KEY (UserId) REFERENCES User(Id)
);

CREATE TABLE PerformanceReview (
    Id SERIAL PRIMARY KEY,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Description VARCHAR(2048),
    BenchMark DECIMAL(5, 2) CHECK (BenchMark BETWEEN 0.00 AND 999.99),
    UserId INT,
    ComputerId INT,
    Date DATETIME,
    FOREIGN KEY (UserId) REFERENCES User(Id),
    FOREIGN KEY (ComputerId) REFERENCES Computer(Id)
);

CREATE TABLE DesignReview (
    Id SERIAL PRIMARY KEY,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Description VARCHAR(2048),
    UserId INT,
    ComputerId INT,
    Date DATETIME,
    FOREIGN KEY (UserId) REFERENCES User(Id),
    FOREIGN KEY (ComputerId) REFERENCES Computer(Id)
);

CREATE TABLE SatisfactionReview (
    Id SERIAL PRIMARY KEY,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Description VARCHAR(2048),
    UserId INT,
    ComputerId INT,
    Date DATETIME,
    FOREIGN KEY (UserId) REFERENCES User(Id),
    FOREIGN KEY (ComputerId) REFERENCES Computer(Id)
);

CREATE TABLE Computer (
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

CREATE TABLE AssembledIn (
    Brand VARCHAR(127) PRIMARY KEY,
    AssembledIn VARCHAR(127),
);

CREATE TABLE Cpu (
    Id SERIAL PRIMARY KEY,
    Model VARCHAR(127),
    ClockSpeed DECIMAL(5, 2) CHECK (ClockSpeed BETWEEN 0.00 AND 100.00),
    CoreCount INT,
    Generation INT,
    FOREIGN KEY (Model) REFERENCES CpuBrand(Model)
);

CREATE TABLE CpuBrand (
Model VARCHAR(127) PRIMARY KEY,
Brand VARCHAR(127)
);


CREATE TABLE Gpu (
    Id SERIAL PRIMARY KEY,
    Brand VARCHAR(127),
    Model VARCHAR(127),
    Memory INT,
    ClockSpeed DECIMAL(3, 2),
);

CREATE TABLE Storage (
    Id SERIAL PRIMARY KEY,
    Brand VARCHAR(127),
    Model VARCHAR(127),
    Capacity INT,
    Type CHAR(3) CHECK (Type IN ('HDD', 'SSD')),
);

CREATE TABLE Monitor (
    Id SERIAL PRIMARY KEY,
    Brand VARCHAR(127),
    Model VARCHAR(127),
    RefreshRate INT,
    Size DECIMAL(3, 1) CHECK (Size BETWEEN 0.0 AND 99.9),
    Resolution VARCHAR(16),
);

CREATE TABLE ComputerStore (
    Address VARCHAR(255) PRIMARY KEY,
    Name VARCHAR(255),
);

CREATE TABLE Sells (
    StoreAddress VARCHAR(255),
    ComputerId INT,
    FOREIGN KEY (StoreAddress) REFERENCES ComputerStore(Address),
    FOREIGN KEY (ComputerId) REFERENCES Computer(Id)
);

CREATE TABLE Searches (
    UserId INT,
    ComputerId INT,
    FOREIGN KEY (UserId) REFERENCES User(Id),
    FOREIGN KEY (ComputerId) REFERENCES Computer(Id)
);

CREATE TABLE Compares (
    UserId INT,
    ComputerIdOne INT,
    ComputerIdTwo INT,
    FOREIGN KEY (UserId) REFERENCES User(Id),
    FOREIGN KEY (ComputerIdOne) REFERENCES Computer(Id),
    FOREIGN KEY (ComputerIdTwo) REFERENCES Computer(Id)
);

CREATE TABLE Endorses (
    StoreAddress VARCHAR(255),
    ReviewId INT,
    FOREIGN KEY (StoreAddress) REFERENCES ComputerStore(Address),
    FOREIGN KEY (ReviewId) REFERENCES PerformanceReview(Id)
);