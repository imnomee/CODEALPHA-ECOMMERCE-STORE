# CodeAlpha Full Stack Task -1, E-Commerce Project

## Table of Contents

-   [Introduction](#introduction)
-   [Technologies Used](#technologies-used)
-   [Features](#features)
-   [Getting Started](#getting-started)
-   [Usage](#usage)
-   [API Endpoints](#api-endpoints)
-   [License](#license)

## Introduction

This is an E-Commerce application built with the MongoDB, Express.js, Node.js and Pug for templating. The application allows users to register, log in, browse products, place orders, and manage their accounts.

## Technologies Used

-   **Backend**: Node.js, Express.js, MongoDB, Mongoose
-   **Frontend**: Pug (template engine), HTML, CSS
-   **Authentication**: JSON Web Tokens (JWT), BcryptJs
-   **Middleware**: Express middleware for authentication and error handling

## Features

-   User registration and authentication
-   Product listing and management
-   Order placement with stock management
-   User order history
-   Responsive design with a user-friendly interface

## Getting Started

To get started with the project, follow these steps:

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/imnomee/CODEALPHA-ECOMMERCE-STORE.git
    ```

2. **Navigate to the Project Directory**:

    ```bash
    cd ecommerce-project
    ```

3. **Install Dependencies**:

    ```bash
    npm install
    ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add your environment variables:

    ```
    JWT_SECRET=your_jwt_secret
    MONGO_URI=your_mongodb_connection_string
    PORT=7860
    ```

5. **Run the Application**:
    ```bash
    npm run dev
    ```

## Usage

-   Open your browser and navigate to `http://localhost:7860` to access the application.
-   Use the registration form to create a new account, or log in with an existing account.

## API Endpoints

| Method | Endpoint            | Description                    |
| ------ | ------------------- | ------------------------------ |
| POST   | /api/users/register | Register a new user            |
| POST   | /api/users/login    | Log in a user                  |
| GET    | /api/products       | Get all products               |
| GET    | /api/products/:id   | Get single product             |
| POST   | /api/orders         | Create a new order             |
| GET    | /api/orders/:userId | Get orders for a specific user |
| ------ | ------------------- | ------------------------------ |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
