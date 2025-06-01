# 📚 Book Review API

A RESTful API for managing books and user reviews using Node.js, Express.js, and MongoDB. Includes user authentication with JWT.

---

## 🚀 Tech Stack

- Node.js + Express.js
- MongoDB
- JWT Authentication
- Postman (for testing)
- dotenv (for config)

---

## 📦 Setup Instructions

1. Clone the repo  
   `git clone https://github.com/DikshaK2/bookReview`

2. Install dependencies  
   `npm install`

3. Start the server
   node server.js
   
4. Create a `.env` file:

🔐 Signup
POST /api/signup
Body:
{
"username": "john",
"password": "123456"
}

🔐 Login
POST /api/login
Body:
{
"username": "john",
"password": "123456"
}
Response:
{
"token": "your_jwt_token"
}

📘 Add a New Book (Authenticated)
POST /api/books
Headers:
Authorization: Bearer <token>
Body:
{
"title": "Atomic Habits",
"author": "James Clear",
"genre": "Self-help"
}

📚 Get All Books
GET /api/books
Optional query parameters:
?page=1&limit=5&author=James%20Clear&genre=Self-help

📖 Get Book Details by ID
GET /api/books/:id

✍️ Post a Review (Authenticated)
POST /api/books/:id/reviews
Headers:
Authorization: Bearer <token>
Body:
{
"rating": 5,
"comment": "Amazing book!"
}

✏️ Update Your Review (Authenticated)
PUT /api/reviews/:id
Headers:
Authorization: Bearer <token>
Body:
{
"rating": 4,
"comment": "Updated review"
}

❌ Delete Your Review (Authenticated)
DELETE /api/reviews/:id
Headers:
Authorization: Bearer <token>

🔍 Search Books by Title or Author
GET /api/search?query=atomic

