# Authentication Service - Multi-Vendor Platform

The **Authentication Service** is a key microservice in the Multi-Vendor Platform, responsible for managing user accounts, authentication, and profile management. It provides secure endpoints for user signup, login, and profile operations, using JWT-based authentication and role-based access control.

## Features

- **User Signup**: Allows users to create an account with email, password, phone number, and role (e.g., buyer, seller).
- **User Login**: Enables secure login and token issuance for authenticated access.
- **Profile Management**: Supports adding, editing, and retrieving user profiles.
- **Protected Endpoints**: Ensures secure access to resources using middleware-based authentication.

## Technology Stack

- **Node.js**: Runtime environment for building the service.
- **Express.js**: Framework for creating RESTful APIs.
- **Sequelize**: ORM for database management.
- **JWT**: Secure token-based authentication.
- **RabbitMQ**: Message queue for inter-service communication.

## API Endpoints

### User Authentication

1. **Signup**
   - **Endpoint**: `POST /signup`
   - **Description**: Registers a new user.
   - **Request Body**:
     ```json
     {
       "email": "user@example.com",
       "password": "securepassword",
       "phone": "1234567890",
       "role": "buyer"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "User registered successfully.",
       "user": { "id": "123", "email": "user@example.com", "role": "buyer" }
     }
     ```

2. **Login**
   - **Endpoint**: `POST /login`
   - **Description**: Authenticates a user and returns a JWT.
   - **Request Body**:
     ```json
     {
       "email": "user@example.com",
       "password": "securepassword"
     }
     ```
   - **Response**:
     ```json
     {
       "token": "jwt-token",
       "user": { "id": "123", "email": "user@example.com", "role": "buyer" }
     }
     ```

### User Profile

3. **Add Profile**
   - **Endpoint**: `POST /profile`
   - **Description**: Adds a new profile for the authenticated user.
   - **Protected**: Yes
   - **Request Body**:
     ```json
     {
       "name": "John Doe",
       "gender": "male",
       "street": "123 Main St",
       "postalCode": "12345",
       "city": "CityName",
       "country": "CountryName"
     }
     ```
   - **Response**:
     ```json
     { "message": "Profile added successfully.", "profile": { ... } }
     ```

4. **Edit Profile**
   - **Endpoint**: `PUT /profile`
   - **Description**: Updates the user profile.
   - **Protected**: Yes
   - **Request Body**:
     ```json
     {
       "name": "John Updated",
       "gender": "male",
       "street": "456 Another St",
       "postalCode": "67890",
       "city": "UpdatedCity",
       "country": "UpdatedCountry"
     }
     ```
   - **Response**:
     ```json
     { "message": "Profile updated successfully.", "profile": { ... } }
     ```

5. **Get Profile**
   - **Endpoint**: `GET /profile`
   - **Description**: Fetches the authenticated user’s profile.
   - **Protected**: Yes
   - **Response**:
     ```json
     { "profile": { "name": "John Doe", "city": "CityName", ... } }
     ```

### Internal Utility

8. **Get User**
   - **Endpoint**: `GET /`
   - **Description**: Retrieves basic details of the authenticated user.
   - **Protected**: Yes
   - **Response**:
     ```json
     { "user": { "id": "123", "email": "user@example.com", ... } }
     ```

## Setup and Installation

### Prerequisites

- **Node.js**: >=16.x
- **npm or yarn**
- **RabbitMQ**: For message queue communication.
- **PostgreSQL**: Database for user data.

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/AWESOME04/Auth-Service.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   - Database credentials.
   - JWT secret key.
   - RabbitMQ URL.
4. Run the server:
   ```bash
   node index.js
   ```
   The service will run on `http://localhost:8000`.

## Deployment

- **Hosting**: Deployed on Render.
- **Database**: Hosted on Neon.
- **Message Queue**: CloudAMQP.

## Integration

This service communicates with other microservices via RabbitMQ for seamless event-driven interactions. Example queues include:

- `User_Signed_Up`: Notifies other services when a new user registers.
