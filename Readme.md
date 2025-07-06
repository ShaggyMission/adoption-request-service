# 🐾 Adoption Request Service - Shaggy Mission

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
</div>

<div align="center">
  <h3>💕 Pet Adoption Request Management Microservice</h3>
  <p><em>Part of the Shaggy Mission ecosystem - Connecting loving families with pets in need! 🐕🐱</em></p>
</div>

---

## 🌟 Overview

The **Adoption Request Service** is a crucial microservice in the Shaggy Mission platform that manages adoption requests from potential pet parents. This service facilitates the connection between people looking to adopt pets and the animals waiting for their forever homes, ensuring a smooth and organized adoption process.

## 🎯 What This Service Does

- **Adoption Request Creation**: Process and validate adoption requests from potential adopters
- **Pet Availability Verification**: Validate pet availability through integration with Pet Service
- **Request Status Management**: Track adoption requests with pending, approved, and rejected statuses
- **User-Pet Matching**: Connect interested adopters with specific pets
- **Message Support**: Allow adopters to include personal messages with their requests
- **Data Validation**: Comprehensive validation of user and pet information
- **External Service Integration**: Seamless communication with Pet Service for real-time data
- **Error Handling**: Robust error management for various scenarios

## 🛠️ Tech Stack

- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **HTTP Client**: Axios for external service communication
- **Validation**: Comprehensive input validation and sanitization
- **RESTful Design**: Clean POST endpoint for resource creation
- **Documentation**: Swagger UI for interactive API documentation
- **Error Handling**: Comprehensive error management and logging
- **Microservice Architecture**: Integration with Pet Service for data validation

## 📡 API Endpoints

### Create Adoption Request
**`POST /adoption-requests`**
- Creates a new adoption request for a specific pet
- Validates pet availability through Pet Service integration
- Stores request with pending status by default
- Supports optional personal messages from adopters

**Request Body:**
```json
{
  "userId": "string (required)",
  "petId": "string (required)",
  "message": "string (optional)"
}
```

**Request Example:**
```bash
POST /adoption-requests
Content-Type: application/json

{
  "userId": "user123",
  "petId": "64f8b2a1c3d4e5f6a7b8c9d0",
  "message": "I would love to provide a loving home for this pet. I have experience with dogs and a large backyard."
}
```

**Successful Response Example:**
```json
{
  "_id": "64f8b2a1c3d4e5f6a7b8c9d1",
  "userId": "user123",
  "petId": "64f8b2a1c3d4e5f6a7b8c9d0",
  "message": "I would love to provide a loving home for this pet. I have experience with dogs and a large backyard.",
  "status": "pending",
  "dateRequested": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Missing required fields or pet not available
  ```json
  {
    "message": "userId and petId are required"
  }
  ```
  ```json
  {
    "message": "Pet is not available for adoption"
  }
  ```
- `500 Internal Server Error`: Database connection or external service issues
  ```json
  {
    "message": "Internal server error"
  }
  ```

### API Documentation
**`GET /adoptionRequest-docs`**
- Interactive Swagger UI documentation
- Complete API specification with examples
- Request/response schemas and validation rules
- Try-it-out functionality for testing the adoption request endpoint

## 🔧 Core Functionality

### Adoption Request Processing
The service validates required fields (userId and petId), verifies pet availability through Pet Service API, creates adoption request with pending status, stores optional adopter messages, and returns complete request information with unique ID.

### Pet Availability Verification
The service integrates with Pet Service to fetch pet details, validates pet exists and is available for adoption, prevents requests for pets that are already adopted or unavailable, and provides real-time availability checking.

### Request Status Management
The service implements status tracking (pending, approved, rejected), defaults new requests to pending status, provides foundation for approval workflow, and maintains request history with timestamps.

### Data Validation & Security
The service validates required fields before processing, sanitizes user input to prevent injection attacks, handles external service errors gracefully, and maintains data integrity with Mongoose schema validation.

## 🌐 Service Integration

This microservice integrates seamlessly with other Shaggy Mission platform components by communicating with Pet Service for availability verification, supporting adoption management workflows, providing data for administrative dashboards, and enabling notification systems for request updates.

## 🔒 Data Security & Performance

- **Input Validation**: Comprehensive validation of all request fields
- **External Service Integration**: Secure communication with Pet Service
- **Error Handling**: Graceful handling of service unavailability
- **Data Integrity**: Mongoose schema validation for consistent data
- **Request Tracking**: Unique IDs for all adoption requests
- **Status Management**: Controlled status transitions

## 🗃️ Database Schema

### Adoption Request Document Structure
```javascript
{
  _id: ObjectId,
  userId: String (required),
  petId: String (required),
  message: String (optional),
  status: String (enum: ['pending', 'approved', 'rejected'], default: 'pending'),
  dateRequested: Date (default: Date.now)
}
```

### Request Status Flow
```javascript
{
  pending: "Initial status for new requests",
  approved: "Request approved by admin/staff",
  rejected: "Request declined or pet no longer available"
}
```

## 📚 API Documentation

Complete API documentation is available through Swagger UI at `/adoptionRequest-docs` when the service is running. The documentation includes:

- Interactive endpoint testing with request examples
- Comprehensive request/response schemas
- Validation rules and error handling scenarios
- Status code explanations and error messages
- External service integration details
- Best practices for adoption request submission

## 🔧 Development

### Project Structure
```
├── config/
│   └── db.js                           # MongoDB connection setup
├── controllers/
│   └── adoptionRequest.controller.js   # Adoption request logic
├── models/
│   └── adoptionRequest.model.js        # Mongoose AdoptionRequest schema
├── routes/
│   └── adoptionRequest.routes.js       # API route definitions
├── docs/
│   └── swagger.yaml                    # OpenAPI specification
├── app.js                              # Express application setup
└── server.js                           # Server startup and database connection
```

### Testing the API
```bash
# Create adoption request
curl -X POST "http://localhost:3015/adoption-requests" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "petId": "64f8b2a1c3d4e5f6a7b8c9d0",
    "message": "I would love to adopt this pet!"
  }'

# Expected response includes request details with pending status
```

### Common Usage Scenarios
- **Pet Adoption**: Submit adoption requests for specific pets
- **Administrative Review**: Process and manage incoming adoption requests
- **Status Tracking**: Monitor request status and approval workflow
- **Communication**: Include personal messages with adoption requests
- **Integration**: Connect with Pet Service for availability verification



### Service Dependencies
- **Pet Service**: Required for pet availability verification
- **MongoDB**: Database for storing adoption requests
- **User Service**: Future integration for user validation

---

<div align="center">
  <p><strong>Built with ❤️ for connecting pets with loving families 🐕🐱</strong></p>
  <p><em>Every adoption request is a step toward a forever home!</em></p>
  <p>📖 <a href="/adoptionRequest-docs">View API Documentation</a></p>
</div>