CREATE TABLE categories (
                            category_id SERIAL PRIMARY KEY,
                            category_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cars (
                      car_id SERIAL PRIMARY KEY,
                      brand VARCHAR(50) NOT NULL,
                      model VARCHAR(50) NOT NULL,
                      year INT NOT NULL,
                      category_id INT NOT NULL REFERENCES categories(category_id),
                      daily_rate DECIMAL(10,2) NOT NULL,
                      transmission VARCHAR(20),
                      fuel_type VARCHAR(20),
                      seats INT,
                      available BOOLEAN DEFAULT TRUE
);

CREATE TABLE users (
                       user_id SERIAL PRIMARY KEY,
                       first_name VARCHAR(50) NOT NULL,
                       last_name VARCHAR(50) NOT NULL,
                       email VARCHAR(100) UNIQUE,
                       phone VARCHAR(20)
);

CREATE TABLE reservations (
                              reservation_id SERIAL PRIMARY KEY,
                              user_id INT NOT NULL REFERENCES users(user_id),
                              car_id INT NOT NULL REFERENCES cars(car_id),
                              start_date DATE NOT NULL,
                              end_date DATE NOT NULL,
                              status VARCHAR(20) DEFAULT 'Reserved'
);