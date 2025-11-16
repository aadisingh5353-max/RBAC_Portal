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

## **1. Node.js (v14 or higher recommended)**

Download from: https://nodejs.org/en/download  
Verify installation:

