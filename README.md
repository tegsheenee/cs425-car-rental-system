# Car Rental System

A web-based Car Rental System developed as a course project for **CS425 Software Engineering**.

The application allows customers to search and browse available vehicles, view car details, receive AI-powered car recommendations, and make or manage reservations. Administrators can manage the vehicle inventory and view reservations.

## Repository

GitHub repository:

https://github.com/tegsheenee/cs425-car-rental-system

## Features

### Customer

- Register as a customer
- Search and browse available cars
- Filter cars by category, price, seats, transmission, and fuel type
- View car details
- Receive AI-powered car recommendations
- Make a reservation
- View reservations
- Cancel a reservation

### Administrator

- Add cars
- Update car information
- Remove cars
- View reservations

## Technology Stack

### Frontend

- React
- TypeScript
- Vite

### Backend

- Express.js
- TypeScript
- Node.js runtime

### Database

- PostgreSQL

### Database Access

- `pg` PostgreSQL driver
- Direct parameterized SQL queries

### AI Recommendation

- Internal rule-based recommendation engine
- Implemented in TypeScript
- No external AI API or LLM service

### Development Tools

- IntelliJ IDEA
- Git
- GitHub

## System Architecture

```text
Browser
   |
   v
React + TypeScript Frontend
   |
   | REST API
   v
Express.js + TypeScript Backend
   |
   |-- Car Module
   |-- Reservation Module
   |-- AI Recommendation Module
   |
   | Direct SQL using pg
   v
PostgreSQL Database
```

The backend follows a layered architecture:

```text
Routes
   |
Controllers
   |
Services
   |
Repositories
   |
PostgreSQL
```

## Project Structure

```text
cs425-car-rental-system/
|
|-- frontend/
|   |-- src/
|   |-- public/
|   |-- package.json
|   `-- vite.config.ts
|
|-- backend/
|   |-- src/
|   |   |-- controllers/
|   |   |-- services/
|   |   |-- repositories/
|   |   |-- routes/
|   |   |-- models/
|   |   |-- db/
|   |   |-- app.ts
|   |   `-- server.ts
|   |
|   |-- database/
|   |   |-- schema.sql
|   |   `-- sample-data.sql
|   |
|   |-- package.json
|   |-- tsconfig.json
|   `-- .env
|
`-- README.md
```

## Database Tables

### `users`

Stores customer information.

- `user_id`
- `first_name`
- `last_name`
- `email`
- `phone`

Authentication is not included in the current project scope.

### `categories`

Stores vehicle categories.

- `category_id`
- `category_name`

### `cars`

Stores rental vehicle information.

- `car_id`
- `brand`
- `model`
- `year`
- `category_id`
- `daily_rate`
- `transmission`
- `fuel_type`
- `seats`
- `available`

### `reservations`

Stores customer reservations.

- `reservation_id`
- `user_id`
- `car_id`
- `start_date`
- `end_date`
- `status`

## AI Recommendation Logic

The recommendation module ranks available cars according to customer preferences.

The initial recommendation score may consider:

- Vehicle category
- Maximum daily rental price
- Passenger capacity
- Transmission type
- Fuel type
- Vehicle availability

The highest-scoring cars are returned as recommendations.

## Current API Endpoints

### Cars

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/cars` | Retrieve all cars |
| `GET` | `/cars/:id` | Retrieve one car |
| `POST` | `/cars` | Add a car |
| `PUT` | `/cars/:id` | Update a car |
| `DELETE` | `/cars/:id` | Remove a car |

### Reservations

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/reservations` | Retrieve reservations |
| `POST` | `/reservations` | Create a reservation |
| `PUT` | `/reservations/:id` | Update a reservation |
| `DELETE` | `/reservations/:id` | Cancel a reservation |


## Local Development

```text
Frontend:  http://localhost:5173
Backend:   http://localhost:3000
Database:  localhost:5432
```

## Course Deliverables

- Vision document
- Requirements analysis
- Use case model
- High-level architecture diagram
- Sequence diagrams
- Collaboration diagrams
- VOPC diagrams
- Class diagram
- Database design
- Implementation
- Testing documentation

## Author

**Tegshbayar Ganbat**

CS425 Software Engineering
