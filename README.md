﻿# journeyvibes-server
---

### ✅ `journeyvibes-server` – Backend README

```markdown
# Journey Vibes – Server (Backend)

🚀 A robust RESTful API for managing a travel website’s backend using Node.js, Express, and MongoDB. Supports admin and user authentication, content management, and secure data operations.

## 🔍 Project Overview

The backend of **Journey Vibes** handles all business logic and database interactions. It includes secured routes for user management, travel bookings, blogs, enquiries, and services using JWT-based authentication and Mongoose models.

## 🔐 Key Features

- ✅ JWT Authentication (Admin & User)
- 📦 REST APIs for:
  - Tours
  - Services
  - Blogs
  - Enquiries
  - Bookings
  - Users
- 🧾 Admin & User Sign Up / Login
- 🔒 Protected Routes for dashboards
- 🧱 MongoDB Atlas Cloud Integration

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose ODM**
- **JWT (jsonwebtoken)** – for secure route access
- **CORS + Express JSON middleware**

## 📁 Folder Structure Highlights

- `model/` – Contains all Mongoose schemas (Tour, Service, Blog, etc.)
- `auth.js` – JWT middleware for protected routes
- `index.js` – Main API entry point with all route handlers

## 🧪 API Routes (Sample)

- `POST /login` – Admin login
- `POST /signup` – Admin sign up
- `GET /tours` – Fetch all tours
- `POST /blogs` – Create blog post
- `DELETE /enquiries/:id` – Delete enquiry
- `GET /dashboard` – Protected route



## ▶️ Run Locally

```bash
npm install
node index.js
