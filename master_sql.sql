DROP TABLE IF EXISTS Endorses;
DROP TABLE IF EXISTS Compares;
DROP TABLE IF EXISTS Searches;
DROP TABLE IF EXISTS Sells;
DROP TABLE IF EXISTS ComputerStore;
DROP TABLE IF EXISTS AssembledIn;
DROP TABLE IF EXISTS SatisfactionReview;
DROP TABLE IF EXISTS DesignReview;
DROP TABLE IF EXISTS PerformanceReview;
DROP TABLE IF EXISTS Computer;
DROP TABLE IF EXISTS BrandAssembles;
DROP TABLE IF EXISTS Monitor;
DROP TABLE IF EXISTS Storage;
DROP TABLE IF EXISTS Gpu;
DROP TABLE IF EXISTS Cpu;
DROP TABLE IF EXISTS CpuBrand;
DROP TABLE IF EXISTS PremiumUser;
DROP TABLE IF EXISTS User;

CREATE TABLE User (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(127),
    Email VARCHAR(127),
    FirstLoginDate DATETIME
);

CREATE TABLE PremiumUser (
    UserId BIGINT UNSIGNED,
    ExpiryDate DATETIME,
    FOREIGN KEY (UserId) REFERENCES User(Id)
);

CREATE TABLE CpuBrand (
    Model VARCHAR(127) PRIMARY KEY,
    Brand VARCHAR(127)
);

CREATE TABLE Cpu (
    Id SERIAL PRIMARY KEY,
    Model VARCHAR(127),
    ClockSpeed DECIMAL(5, 2) CHECK (ClockSpeed BETWEEN 0.00 AND 100.00),
    CoreCount INT,
    Generation INT,
    FOREIGN KEY (Model) REFERENCES CpuBrand(Model)
);

CREATE TABLE Gpu (
    Id SERIAL PRIMARY KEY,
    Brand VARCHAR(127),
    Model VARCHAR(127),
    Memory INT,
    ClockSpeed DECIMAL(3, 2)
);

CREATE TABLE Storage (
    Id SERIAL PRIMARY KEY,
    Brand VARCHAR(127),
    Model VARCHAR(127),
    Capacity INT,
    Type CHAR(3) CHECK (Type IN ('HDD', 'SSD'))
);

CREATE TABLE Monitor (
    Id SERIAL PRIMARY KEY,
    Brand VARCHAR(127),
    Model VARCHAR(127),
    RefreshRate INT,
    Size DECIMAL(3, 1) CHECK (Size BETWEEN 0.0 AND 99.9),
    Resolution VARCHAR(16)
);

CREATE TABLE BrandAssembles (
    Brand VARCHAR(127) PRIMARY KEY,
    AssembledIn VARCHAR(127)
);

CREATE TABLE Computer (
    Id SERIAL PRIMARY KEY,
    Brand VARCHAR(127),
    Price DECIMAL(5, 2) CHECK (Price BETWEEN 0.00 AND 999.99),
    AssembledIn VARCHAR(127),
    CpuId BIGINT UNSIGNED,
    GpuId BIGINT UNSIGNED,
    StorageId BIGINT UNSIGNED,
    MonitorId BIGINT UNSIGNED,
    FOREIGN KEY (CpuId) REFERENCES Cpu(Id),
    FOREIGN KEY (GpuId) REFERENCES Gpu(Id),
    FOREIGN KEY (StorageId) REFERENCES Storage(Id),
    FOREIGN KEY (MonitorId) REFERENCES Monitor(Id),
    FOREIGN KEY (Brand) REFERENCES BrandAssembles(Brand)
);

CREATE TABLE PerformanceReview (
    Id SERIAL PRIMARY KEY,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Description VARCHAR(2048),
    BenchMark DECIMAL(5, 2) CHECK (BenchMark BETWEEN 0.00 AND 999.99),
    UserId BIGINT UNSIGNED,
    ComputerId BIGINT UNSIGNED,
    Date DATETIME,
    FOREIGN KEY (UserId) REFERENCES User(Id),
    FOREIGN KEY (ComputerId) REFERENCES Computer(Id)
);

CREATE TABLE DesignReview (
    Id SERIAL PRIMARY KEY,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Description VARCHAR(2048),
    UserId BIGINT UNSIGNED,
    ComputerId BIGINT UNSIGNED,
    Date DATETIME,
    FOREIGN KEY (UserId) REFERENCES User(Id),
    FOREIGN KEY (ComputerId) REFERENCES Computer(Id)
);

CREATE TABLE SatisfactionReview (
    Id SERIAL PRIMARY KEY,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Description VARCHAR(2048),
    UserId BIGINT UNSIGNED,
    ComputerId BIGINT UNSIGNED,
    Date DATETIME,
    FOREIGN KEY (UserId) REFERENCES User(Id),
    FOREIGN KEY (ComputerId) REFERENCES Computer(Id)
);

CREATE TABLE AssembledIn (
    Brand VARCHAR(127) PRIMARY KEY,
    AssembledIn VARCHAR(127)
);

CREATE TABLE ComputerStore (
    Address VARCHAR(255) PRIMARY KEY,
    Name VARCHAR(255)
);

CREATE TABLE Sells (
    StoreAddress VARCHAR(255),
    ComputerId BIGINT UNSIGNED,
    FOREIGN KEY (StoreAddress) REFERENCES ComputerStore(Address),
    FOREIGN KEY (ComputerId) REFERENCES Computer(Id)
);

CREATE TABLE Searches (
    UserId BIGINT UNSIGNED,
    ComputerId BIGINT UNSIGNED,
    FOREIGN KEY (UserId) REFERENCES User(Id),
    FOREIGN KEY (ComputerId) REFERENCES Computer(Id)
);

CREATE TABLE Compares (
    UserId BIGINT UNSIGNED,
    ComputerIdOne BIGINT UNSIGNED,
    ComputerIdTwo BIGINT UNSIGNED,
    FOREIGN KEY (UserId) REFERENCES User(Id),
    FOREIGN KEY (ComputerIdOne) REFERENCES Computer(Id),
    FOREIGN KEY (ComputerIdTwo) REFERENCES Computer(Id)
);

CREATE TABLE Endorses (
    StoreAddress VARCHAR(255),
    ReviewId BIGINT UNSIGNED,
    FOREIGN KEY (StoreAddress) REFERENCES ComputerStore(Address),
    FOREIGN KEY (ReviewId) REFERENCES PerformanceReview(Id)
);

INSERT INTO User (Name, Email, FirstLoginDate) VALUES
('John Doe', 'john.doe@example.com', '2024-03-01 09:00:00'),
('Jane Smith', 'jane.smith@example.com', '2024-02-28 09:00:00'),
('Alex Johnson', 'alex.johnson@example.com', '2024-01-15 09:00:00'),
('Maria Garcia', 'maria.garcia@example.com', '2023-12-10 09:00:00'),
('Paul Maximus', 'paul.maximus@example.com', '2023-12-15 09:00:00');

INSERT INTO PremiumUser (UserId, ExpiryDate) VALUES
(1, '2025-03-01'),
(2, '2025-02-28'),
(3, '2025-01-15'),
(4, '2025-12-10'),
(5, '2025-12-15');

INSERT INTO CpuBrand (Model, Brand) VALUES
('Core i7', 'Intel'),
('Core i5', 'Intel'),
('Ryzen 7', 'AMD'),
('Ryzen 5', 'AMD'),
('Core i9', 'Intel');

INSERT INTO Cpu (Model, ClockSpeed, CoreCount, Generation) VALUES
('Core i7', 3.8, 8, 10),
('Core i5', 2.9, 4, 10),
('Ryzen 7', 3.6, 8, 4),
('Ryzen 5', 3.4, 6, 4),
('Core i9', 4.0, 8, 11);

INSERT INTO Gpu (Brand, Model, Memory, ClockSpeed) VALUES
('Nvidia', 'RTX 3080', 10, 1.7),
('Nvidia', 'RTX 3070', 8, 1.5),
('AMD', 'Radeon RX 6800', 16, 1.8),
('AMD', 'Radeon RX 6700 XT', 12, 1.6),
('Nvidia', 'RTX 3060', 12, 1.4);

INSERT INTO Storage (Brand, Model, Capacity, Type) VALUES
('BrandX', 'ModelX1', 256, 'SSD'),
('BrandX', 'ModelX2', 512, 'SSD'),
('BrandY', 'ModelY1', 1024, 'HDD'),
('BrandY', 'ModelY2', 2048, 'HDD'),
('BrandZ', 'ModelZ', 512, 'SSD');

INSERT INTO Monitor (Brand, Model, RefreshRate, Size, Resolution) VALUES
('BrandM', 'ModelM', 144, 27.0, '2560x1440'),
('BrandM', 'ModelN', 60, 24.0, '1920x1080'),
('BrandO', 'ModelO', 75, 21.5, '1920x1080'),
('BrandP', 'ModelP', 120, 24.0, '2560x1440'),
('BrandQ', 'ModelQ', 240, 27.0, '1920x1080');

INSERT INTO BrandAssembles (Brand, AssembledIn) VALUES
('Dell', 'China'),
('Apple', 'USA'),
('Razor', 'Singapore'),
('HP', 'Japan'),
('Lenovo', 'Taiwan');

INSERT INTO Computer (Brand, Price, AssembledIn, CpuId, GpuId, StorageId, MonitorId) VALUES
('Dell', 3200.00, 'China', 1, 2, 2, 3),
('Razor', 2100.00, 'Singapore', 3, 3, 3, 1),
('Apple', 3499.99, 'USA', 2, 1, 1, 3),
('HP', 1500.00, 'Japan', 4, 4, 4, 4),
('Lenovo', 1800.00, 'Taiwan', 5, 5, 5, 5);

INSERT INTO PerformanceReview (Rating, Description, BenchMark, UserId, ComputerId, Date) VALUES
(5, 'Excellent performance and value.', 10000.00, 1, 1, '2024-03-01 09:00:00'),
(4, 'Good performance for the price.', 8500.00, 2, 2, '2024-03'),
(4, 'Good performance for the price.', 8500.00, 2, 2, '2024-03-02 09:30:00'),
(3, 'Average performance, decent for everyday tasks.', 7000.00, 3, 3, '2024-03-03 10:00:00'),
(2, 'Below average performance, struggles with heavy tasks.', 5500.00, 4, 4, '2024-03-04 10:30:00'),
(1, 'Poor performance, not recommended for modern applications.', 4000.00, 5, 5, '2024-03-05 11:00:00');

INSERT INTO DesignReview (Rating, Description, UserId, ComputerId, Date) VALUES
(4, 'Sleek and modern design.', 1, 2, '2024-03-06 10:00:00'),
(5, 'Outstanding design and aesthetics.', 2, 3, '2024-03-07 11:00:00'),
(3, 'Functional design, but nothing special.', 3, 4, '2024-03-08 12:00:00'),
(2, 'Design is a bit outdated.', 4, 1, '2024-03-09 13:00:00'),
(1, 'Unappealing design and poor ergonomics.', 5, 2, '2024-03-10 14:00:00');

INSERT INTO SatisfactionReview (Rating, Description, UserId, ComputerId, Date) VALUES
(4, 'Quite satisfied with the purchase overall.', 1, 1, '2024-03-11 15:00:00'),
(3, 'Satisfied, but there are some issues.', 2, 2, '2024-03-12 16:00:00'),
(5, 'Extremely satisfied, exceeded expectations.', 3, 3, '2024-03-13 17:00:00'),
(2, 'Not satisfied, many problems encountered.', 4, 4, '2024-03-14 18:00:00'),
(1, 'Very unsatisfied, would not recommend.', 5, 5, '2024-03-15 19:00:00');

INSERT INTO ComputerStore (Address, Name) VALUES
('123 Tech Road', 'Tech Store A'),
('456 Innovation Ave', 'Tech Store B'),
('789 Computing Blvd', 'Tech Store C'),
('101 Data Dr', 'Tech Store D'),
('202 Info Way', 'Tech Store E');

INSERT INTO Sells (StoreAddress, ComputerId) VALUES
('123 Tech Road', 1),
('456 Innovation Ave', 2),
('789 Computing Blvd', 3),
('101 Data Dr', 4),
('202 Info Way', 5);

INSERT INTO Searches (UserId, ComputerId) VALUES
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 1);

INSERT INTO Compares (UserId, ComputerIdOne, ComputerIdTwo) VALUES
(1, 3, 2),
(2, 4, 3),
(3, 5, 4),
(4, 1, 5),
(5, 2, 1);

INSERT INTO Endorses (StoreAddress, ReviewId) VALUES
('123 Tech Road', 1),
('456 Innovation Ave', 2),
('789 Computing Blvd', 3),
('101 Data Dr', 4),
('202 Info Way', 5);
