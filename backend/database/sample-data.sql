
INSERT INTO categories (category_name)
VALUES
    ('Sedan'),
    ('SUV'),
    ('Truck'),
    ('Luxury');

-- Cars
INSERT INTO cars
(
    brand,
    model,
    year,
    category_id,
    daily_rate,
    transmission,
    fuel_type,
    seats,
    available
)
VALUES
    ('Toyota','Camry',2024,1,65.00,'Automatic','Gasoline',5,TRUE),
    ('Honda','CR-V',2023,2,85.00,'Automatic','Gasoline',5,TRUE),
    ('Ford','F-150',2024,3,110.00,'Automatic','Gasoline',5,TRUE),
    ('BMW','X5',2023,4,150.00,'Automatic','Gasoline',5,TRUE),
    ('Tesla','Model 3',2024,1,95.00,'Automatic','Electric',5,TRUE);

-- Sample User
INSERT INTO users
(
    first_name,
    last_name,
    email,
    phone
)
VALUES
    (
        'Tegshbayar',
        'Ganbat',
        'tegshe@example.com',
        '555-123-4567'
    );