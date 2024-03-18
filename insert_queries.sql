/*
 *
 */
INSERT INTO User (Name, Email, FirstLoginDate) VALUES
('John Doe', 'john.doe@example.com', '2024-03-01 09:00:00'),
('Jane Smith', 'jane.smith@example.com', '2024-02-28 09:00:00'),
('Alex Johnson', 'alex.johnson@example.com', '2024-01-15 09:00:00'),
('Maria Garcia', 'maria.garcia@example.com', '2023-12-10 09:00:00'),
('Paul Maximus', 'paul.maximus@example.com', '2023-12-15 09:00:00');

INSERT INTO PremiumUser(UserId, ExpiryDate) VALUES
(1, '2024-03-01 09:00:00'),
(2, '2025-02-28 09:00:00'),
(3, '2025-01-15 09:00:00'),
(4, '2024-12-10 09:00:00'),
(5, '2025-12-15 09:00:00'); 


INSERT INTO Cpu (Model, ClockSpeed, CoreCount, Generation) VALUES
('Core i7', 3.8, 8, 10),
('Core i5', 2.9, 4, 10),
('Ryzen 7', 3.6, 8, 4),
('Ryzen 5', 3.4, 6, 4),
('Core i9', 4.0, 8, 11);

INSERT INTO CpuBrand(Model, Brand) VALUES
('Core i7', 'Intel'),
('Core i5', 'Intel'),
('Ryzen 7', 'AMD'),
('Ryzen 5', 'AMD'),
('Core i9', 'Intel');


INSERT INTO Gpu (Brand, Model, Memory, ClockSpeed) VALUES
('NVIdIA', 'RTX 3080', 10, 1.7),
('NVIdIA', 'RTX 3070', 8, 1.5),
('AMD', 'Radeon RX 6800', 16, 1.8),
('AMD', 'Radeon RX 6700 XT', 12, 1.6),
('NVIdIA', 'RTX 3060', 12, 1.4);


INSERT INTO Storage (Model, Brand, Capacity, Type) VALUES
('ModelX1', 'BrandX', 256, 'SSD'),
('ModelX2', 'BrandX', 512, 'SSD'),
('ModelY1', 'BrandY', 1024, 'HDD'),
('ModelY2', 'BrandY', 2048, 'HDD'),
('ModelZ', 'BrandZ', 512, 'SSD');


INSERT INTO Monitor (Brand, Model, Size, Resolution, RefreshRate) VALUES
('BrandM', 'ModelM', 27.0, '2560x1440', 144),
('BrandM', 'ModelN', 24.0, '1920x1080', 60),
('BrandO', 'ModelO', 21.5, '1920x1080', 75),
('BrandP', 'ModelP', 24.0, '2560x1440', 120),
('BrandQ', 'ModelQ', 27.0, '1920x1080', 240);

INSERT INTO Computer (Brand, Price, CpuId, GpuId, StorageId, MonitorId) VALUES
('Dell', 3200.00, 1, 2, 2, 3),
('Razor', 2100.00, 3, 3, 3, 1),
('Apple', 3499.99, 2, 1, 1, 3),
('HP', 1500.00, 4, 4, 4, 4),
('Lenovo', 18000, 5, 5, 5, 5);

INSERT INTO BrandAssembles (Brand, AssembledIn) VALUES
('Dell', 'China'),
('Apple', 'USA'),
('Razor', 'Singapore'),
('HP', 'Japan'),
('Lenovo', 'Taiwan');

INSERT INTO PerformanceReview (Rating, Description, BenchMark, UserId, ComputerId, Date) VALUES
(5, 'Excellent performance and value.', 10000.00, 1, 1, '2024-03-01 09:00:00'),
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


INSERT INTO SatisfactionReview (Rating, Description, UserId, ComputerId, writtenDate) VALUES
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


INSERT INTO Sells (Address, ComputerId) VALUES
('123 Tech Road', 1),
('456 Innovation Ave', 2),
('789 Computing Blvd', 3),
('101 Data Dr', 4),
('202 Info Way', 5);


INSERT INTO Searches(UserId, ComputerId) VALUES
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 1);


INSERT INTO Compares (UserId, ComputerIdOne, ComputerIdTwo) VALUES
(1, 3, 2),
(2, 4, 3),
(3, 5, 4),
(4, 1, 3),
(5, 2, 4);


INSERT INTO Endorses (ReviewId, StoreAddress) VALUES
(1, '123 Tech Road'),
(2, '456 Innovation Ave'),
(3, '789 Computing Blvd'),
(4, '101 Data Dr'),
(5, '202 Info Way');

