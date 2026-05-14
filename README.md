# StudentHub – MERN Stack Web Application

StudentHub is a full-stack MERN web application developed for our college students to buy, sell, exchange, and donate second-hand academic books and study materials.

The platform aims to make educational resources more affordable and accessible for students while reducing the unnecessary waste of academic books.

---

# Features

* User Authentication (JWT-based)
* Add, Edit, and Delete Book Listings
* Upload Book Images using Cloudinary
* Search Books by Title
* Filter Books by Semester and Department
* Admin Verification System for Book Approval
* Student-Friendly Pricing Guidance
* Responsive User Interface
* Protected Routes and Secure Access

---

# Tech Stack

## Frontend

* React.js
* Bootstrap
* CSS

## Backend

* Node.js
* Express.js

## Database

* MongoDB

## Authentication & Security

* JWT Authentication
* bcrypt Password Hashing

## Image Upload

* Cloudinary

---

# Project Objective

In many local second-hand book stores, students often receive very little money for their used books, while the same books are resold at higher prices.

StudentHub was developed to create a fair and student-friendly platform where students can directly exchange academic resources at affordable prices.

---

# Admin Features

* View all uploaded books
* Verify listing details before approval
* Approve or reject books
* Maintain trusted and student-friendly pricing

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Savitri353/StudentHub.git
```

## Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Install Backend Dependencies

```bash
cd backend
npm install
```

---

# Environment Variables

Create a `.env` file inside backend folder and add:

```env
MONGO_URI=your_mongodb_connection
PORT=your_port
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# Run Project

## Start Backend

```bash
npm start
```

## Start Frontend

```bash
npm run dev
```

---

# Future Improvements

* Chat system between students
* Wishlist feature
* Payment integration
* Real-time notifications

---

# Author

Savitri Gamit
