# CODEALPHA-ECOMMERCE-STORE

### Dependencies

`npm install express mongoose body-parser dotenv bcryptjs jsonwebtoken`

Express: Your web framework.
Mongoose: For MongoDB database management (optional but popular).
Body-parser: For handling JSON/form data.
dotenv: To manage environment variables.
Nodemon: Automatically restarts the server during development.

### Folder Strcuture

store/
├── controllers/ // Handles business logic
├── models/ // Database schema (Product, Order, etc.)
├── routes/ // Defines API routes
├── public/ // Static files (CSS, JS, images)
├── views/ // Frontend (HTML templates if you're using them)
├── app.js // Main Express app file
└── .env // Environment variables (for database, ports, etc.)
