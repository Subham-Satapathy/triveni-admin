# Tour Admin Panel - Backend API Endpoints

This document lists all the API endpoints your main tour application should expose for the admin panel to function properly.

## Base URL
All endpoints should be prefixed with your backend API URL, e.g., `https://your-api.com`

## Authentication Header
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication

### POST `/api/admin/login`
Authenticate admin user

**Request Body:**
```json
{
  "email": "admin@tour.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "admin@tour.com",
    "name": "Admin User",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Dashboard

### GET `/api/admin/stats`
Get dashboard statistics

**Response:**
```json
{
  "totalBookings": 150,
  "totalRevenue": 450000,
  "totalVehicles": 25,
  "totalUsers": 89,
  "activeBookings": 12,
  "pendingBookings": 5,
  "totalTours": 10,
  "recentBookings": [...],
  "monthlyRevenue": [...],
  "bookingsByStatus": [...]
}
```

---

## Vehicles

### GET `/api/admin/vehicles`
List all vehicles

**Query Parameters:**
- `isActive` (optional): Filter by active status
- `type` (optional): Filter by vehicle type (CAR, BIKE)

**Response:**
```json
[
  {
    "id": 1,
    "name": "Toyota Innova",
    "type": "CAR",
    "brand": "Toyota",
    "model": "Innova Crysta",
    "ratePerDay": 3000,
    "ratePerHour": 300,
    "isActive": true,
    "fromCity": { "id": 1, "name": "Mumbai" },
    "toCity": { "id": 2, "name": "Pune" }
  }
]
```

### GET `/api/admin/vehicles/:id`
Get single vehicle

### POST `/api/admin/vehicles`
Create new vehicle

**Request Body:** (All vehicle fields)

### PUT `/api/admin/vehicles/:id`
Update vehicle

**Request Body:** (Vehicle fields to update)

### DELETE `/api/admin/vehicles/:id`
Delete vehicle

---

## Tours

### GET `/api/admin/tours`
List all tours

### GET `/api/admin/tours/:id`
Get single tour

### POST `/api/admin/tours`
Create new tour

### PUT `/api/admin/tours/:id`
Update tour

### DELETE `/api/admin/tours/:id`
Delete tour

---

## Bookings

### GET `/api/admin/bookings`
List all bookings

**Query Parameters:**
- `status` (optional): Filter by status (PENDING, PAID, CANCELLED)

### GET `/api/admin/bookings/:id`
Get single booking

### PUT `/api/admin/bookings/:id`
Update booking status

**Request Body:**
```json
{
  "status": "PAID"
}
```

---

## Users

### GET `/api/admin/users`
List all users

### GET `/api/admin/users/:id`
Get single user

### PUT `/api/admin/users/:id`
Update user

**Request Body:**
```json
{
  "isActive": false
}
```

### DELETE `/api/admin/users/:id`
Delete user

---

## Cities

### GET `/api/admin/cities`
List all cities

**Response:**
```json
[
  {
    "id": 1,
    "name": "Mumbai",
    "slug": "mumbai"
  }
]
```

### POST `/api/admin/cities`
Create new city

**Request Body:**
```json
{
  "name": "Mumbai",
  "slug": "mumbai"
}
```

### PUT `/api/admin/cities/:id`
Update city

### DELETE `/api/admin/cities/:id`
Delete city

---

## Error Responses

All endpoints should return appropriate HTTP status codes and error messages:

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "error": "Unauthorized access"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Resource not found"
}
```

**500 Server Error:**
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## CORS Configuration

Make sure your backend API allows requests from the admin panel domain:

```javascript
// Example CORS configuration
app.use(cors({
  origin: ['http://localhost:3001', 'https://admin.yourdomain.com'],
  credentials: true
}));
```

---

## Notes

1. All endpoints except `/api/admin/login` require authentication
2. Include proper error handling for all endpoints
3. Validate admin role before processing requests
4. Use pagination for list endpoints (recommended)
5. Include proper input validation using Zod or similar
6. Log all admin actions for audit purposes
