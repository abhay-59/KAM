# Udaan Lead Management System
## Live Demo
Access the live versions of the frontend and backend applications through the links below:

- **Live Application**: https://kamabhay.netlify.app/
## Project Overview
Udaan Lead Management System is a comprehensive platform designed to streamline the management of leads, interactions, and performance metrics for key account managers (KAMs). It includes features for task planning, performance tracking, user authentication, and detailed reporting, making it a robust solution for sales teams.

---
## System Requirements
### Backend
- **Node.js**: v16 or later
- **MongoDB**: v4.0 or later
- **npm/yarn**: v7 or later

### Frontend
- **React**: v18 or later
- **Node.js**: v16 or later
- **npm/yarn**: v7 or later

---

## Installation Instructions
### 1. Clone the Repository
```bash
$ git clone https://github.com/abhay-59/KAM
$ cd udaan-lead-management
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   $ cd backend
   ```
2. Install dependencies:
   ```bash
   $ npm install
   ```
3. Configure `.env` file with the following variables:
   ```env
   MONGO_URI=your uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   $ npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   $ cd frontend
   ```
2. Install dependencies:
   ```bash
   $ npm install
   ```
3. Start the frontend server:
   ```bash
   $ npm start
   ```

---

## Running Instructions
### Start Backend
```bash
$ cd backend
$ npm run dev
```

### Start Frontend
```bash
$ cd frontend
$ npm start
```

Access the application at `http://localhost:3000`.

---

## API Documentation
### Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login with email and password.

### Restaurants
- **GET** `/api/restaurants`: Fetch all restaurants.
- **POST** `/api/restaurants`: Create a new restaurant.
- **PUT** `/api/restaurants/:id`: Update a restaurant.
- **DELETE** `/api/restaurants/:id`: Delete a restaurant.

### Performance
- **GET** `/api/performance`: Fetch performance metrics for the current month.

### Interactions
- **GET** `/api/calls/today`: Fetch today’s interactions (calls, emails, orders).

---

## Sample Usage Examples
### Fetch Today’s Tasks
Request:
```bash
GET /api/calls/today
Authorization: Bearer <token>
```
Response:
```json
{
  "interactions": [
    {
      "_id": "12345",
      "type": "Call",
      "restaurantName": "ABC Restaurant",
      "contactName": "John Doe",
      "time": "10:00",
      "status": "Pending"
    }
  ]
}
```

---

## Code Setup Process
1. Clone the repository.
2. Set up environment variables in the backend.
3. Install dependencies for both backend and frontend.
4. Start both servers.

---

## Application Running
1. Access the app at `http://localhost:3000`.
2. Register or login as a user.
3. Navigate to the dashboard to view and manage tasks and performance metrics.

---

## Major Features Demonstration
### Task Management
- View and manage tasks (calls, emails, orders) for the day.
- Track completed and pending tasks.

### Performance Metrics
- Identify well-performing and underperforming accounts.
- View aggregated interaction data for the current month.

### User Management
- Register and log in securely.
- Assign restaurants to KAMs and reassign as needed.

---

## Sample images
<img src="https://github.com/user-attachments/assets/6c6ad61d-65a9-4360-9fb9-5639e95dd60e" width="700" height="370">

<img src="https://github.com/user-attachments/assets/f286ed9d-d2f5-41bf-85c5-29c58495fa6f" width="700" height="370">
--

<img src="https://github.com/user-attachments/assets/cfffa3f2-cb26-417c-af62-54eef70aa8bf" width="700" height="370">

<img src="https://github.com/user-attachments/assets/492de51a-19ef-40fc-8acf-590b1db402f1" width="700" height="370">






