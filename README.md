# RBAC – Role-Based Access Control System
A Node.js + Express backend application that manages secure user authentication, role-based authorization, and protected routes using MongoDB, JWT, and Bcrypt.

This system assigns roles like **Admin**, **Manager**, and **User**, and ensures that every API endpoint is accessible only to allowed roles.

---

# Features

### 🔐 Authentication
- User login with JWT tokens  
- Secure password hashing using Bcrypt  
- Token verification middleware  

### 👥 Roles & Permissions
- Predefined roles (Admin, Manager, User)  
- Middleware-based access checks  
- Route-level role restrictions  

### 🗄 Database (MongoDB)
- User schema stored in MongoDB  
- Role embedded inside JWT token  
- Mongoose-based models  

### 🔒 Protected Routes
- Only authenticated users can access private endpoints  
- Role-based filters on sensitive routes  

---

# Prerequisites

Before running this application, ensure you have:

---

---

## **2. MongoDB Community Server**

Download MongoDB:  
https://www.mongodb.com/try/download/community  

Default port: **27017**

Ensure MongoDB is running (either via Compass or terminal).

---

## **3. Postman (optional, for API testing)**  
Download: https://www.postman.com/downloads/

---

# Setup Instructions

## **Step 1: Clone the Project**


---

## **Step 2: Install Dependencies**


This will install:
- Express  
- Mongoose  
- JWT  
- Bcrypt  
- dotenv  

---

## **Step 3: Configure Environment Variables**

Create a file named `.env` in the project root:


**Important:**  
Replace `your_secret_key_here` with any random long string.

---

## **Step 4: Start MongoDB**

If installed normally:

Windows CMD:

Or using terminal:

---

## **Step 5: Run the Application**


Server should start on:

---

# Application Guide

## **1. Register a User**
POST → `/register`

Body:
```json
{
  "username": "john",
  "email": "john@gmail.com",
  "password": "123456",
  "role": "admin"
}
{
  "token": "..."
}
Authorization: Bearer <your_token_here>

Authorization: Bearer <token>
npm uninstall bcrypt
npm install bcrypt
db.users.find()
RBAC/
├── controllers/
│   └── authController.js     # Login / Register logic
│
├── middleware/
│   ├── auth.js               # JWT verification
│   └── role.js               # Role-based access
│
├── models/
│   └── User.js               # User schema
│
├── routes/
│   └── authRoutes.js         # All API routes
│
├── .env                      # Environment variables
├── server.js                 # Entry point
└── package.json
