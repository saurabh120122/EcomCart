# 🛒 Vibe Commerce - Full-Stack MERN E-Commerce Cart

This is a complete, full-stack MERN (MongoDB, Express, React, Node.js) application that simulates the core functionality of an e-commerce platform. It was built as a screening assignment for Vibe Commerce.

The application features a secure, professional-grade backend with JWT (JSON Web Token) authentication, a global error handler, and a persistent, user-specific shopping cart. The frontend is a responsive React application managed with a global state (Context API) for both authentication and cart data.

---

## 📸 Screenshots

| Login Page | Register Page | Product Page |
| :---: | :---: | :---: | 
[Image of Login Page]
 | <img width="1919" height="968" alt="Screenshot 2025-11-08 095450" src="https://github.com/user-attachments/assets/a025708c-e655-4cf4-87f5-72bb032a4536" />


[Image of Register Page]
 | <img width="1919" height="970" alt="Screenshot 2025-11-08 095434" src="https://github.com/user-attachments/assets/eab40279-3015-4588-b5f2-a46db3928309" />


[Image of Product Page]
 |<img width="1899" height="913" alt="image" src="https://github.com/user-attachments/assets/dba9539f-3f66-4a71-b693-4c5bc20abcdd" />


| Cart Page | Checkout Details | Receipt Modal |
| :---: | :---: | :---: |

[Image of Cart Page]
<img width="1919" height="617" alt="image" src="https://github.com/user-attachments/assets/98181046-b876-4878-9817-40e865ecaf62" /><img width="409" height="339" alt="image" src="https://github.com/user-attachments/assets/4cfbcf45-1500-47de-a9c1-aaa0c936729d" />
<img width="1919" height="972" alt="image" src="https://github.com/user-attachments/assets/ddf1a6ae-c27c-4ac7-8389-2e577ae14d9a" />

---

## ✨ Features

* **Authentication:**
    * Secure user registration (Name, Email, Password).
    * Password hashing using **`bcryptjs`**.
    * User login with **JWT (JSON Web Token)** generation.
    * Persistent login state using `localStorage`.
    * Protected backend routes for all cart and checkout operations.
    * Global auth state (React Context) for a seamless UI.
    * Navbar updates to show user's name and a "Logout" button.
* **Shopping Cart (User-Specific):**
    * Each logged-in user gets their own persistent cart stored in MongoDB.
    * **Add to Cart** from the product page.
    * View cart with a detailed list of items.
    * **Update Quantity** (`+` / `-`) directly in the cart.
    * **Remove from Cart** (by setting quantity to 0 or using the "Remove" button).
    * Cart state is globally synced using React Context.
* **Products & Checkout:**
    * Products are fetched live from the external **[Fake Store API](https://fakestoreapi.com/)**.
    * Streamlined checkout process that automatically uses the logged-in user's name and email.
    * Mock checkout clears the user's cart and displays a success receipt.

---

## 🛠️ Tech Stack & Architecture

### Frontend (React)

* **React (v18+):** Component-based UI library.
* **React Router:** For all client-side routing.
* **React Context API:** Used for global state management for both `AuthContext` and `CartContext`.
* **Axios:** For all HTTP requests to the backend.
* **CSS:** Clean, responsive styling with Flexbox and Grid.

### Backend (Node.js / Express / MongoDB)

* **Node.js (ESM):** Uses modern `import`/`export` syntax.
* **Express.js:** Framework for building the REST APIs.
* **MongoDB (Mongoose):** NoSQL database for storing user and cart data.
* **JSON Web Token (JWT):** For generating and verifying user auth tokens.
* **`bcryptjs`:** For hashing user passwords.
* **`dotenv`:** For managing all environment variables.

---

## Diagram: MERN Authentication Flow

This project uses a token-based authentication flow.



1.  User registers or logs in.
2.  The **Express** server verifies credentials, creates a **User** in MongoDB, and signs a **JWT**.
3.  The JWT is sent back to the **React** app.
4.  React stores the token (in `AuthContext` & `localStorage`).
5.  For all future protected requests (like "get cart"), React attaches the token to the `Authorization: Bearer ...` header.
6.  The Express server's **`protect` middleware** intercepts the request, verifies the JWT, and identifies the user before allowing the request to proceed.

### Backend Error Handling

This backend is built with a robust, centralized error-handling system:
* **`asyncHandler`:** A wrapper for all controller functions to automatically catch errors and pass them to the global handler.
* **`ApiError`:** A custom `Error` class for creating predictable errors (e.g., `new ApiError(404, 'Product not found')`).
* **`errorHandler`:** A global middleware that catches all errors and sends a clean, standardized JSON response, ensuring the server never crashes.

---

## 🚀 Getting Started

Follow these instructions to get the project running locally.

### Prerequisites

* Node.js (v16.x or later)
* npm
* MongoDB Atlas Account (or a local MongoDB instance). You will need a **MongoDB Connection String**.



```sh
1. Clone the Repository
git clone [https://github.com/your-username/vibe-commerce-cart.git](https://github.com/your-username/vibe-commerce-cart.git)
cd vibe-commerce-cart
```sh
1. Clone the Repository
git clone [https://github.com/your-username/vibe-commerce-cart.git](https://github.com/your-username/vibe-commerce-cart.git)
cd vibe-commerce-cart
2. Set Up the Backend
Navigate to the backend directory:

Bash

cd backend
Install dependencies:

Bash

npm install
Create your environment file:

Create a new file named .env in the /backend directory.

Copy the contents of .env.example into it (if you made one), or just add the following:

backend/.env

Ini, TOML

PORT=5001
MONGO_URI=your_mongodb_connection_string_goes_here
Replace your_mongodb_connection_string_goes_here with your actual MongoDB URI.

Run the backend server:

Bash

npm run dev
The server will start on http://localhost:5001.

3. Set Up the Frontend
Open a new terminal and go back to the project's root folder.

Navigate to the frontend directory:

Bash

cd frontend
Install dependencies:

Bash

npm install
Run the React application:

Bash

npm start
The React app will open in your browser at http://localhost:3000.

You can now use the application!
```
📦 API Endpoints
All endpoints are prefixed with /api.
| Method | Endpoint        | Description                                                         |
|---------|-----------------|---------------------------------------------------------------------|
| POST    | /register       | Register a new user (requires name, email, password).               |
| POST    | /login          | Log in a user (requires email, password). Returns JWT.              |
| GET     | /products       | Get all products from the Fake Store API.                           |
| GET     | /cart           | Get the logged-in user's cart items and total.                      |
| POST    | /cart           | Add, update, or remove an item. (Send quantity: 0 to remove).       |
| POST    | /checkout       | Mock checkout. Clears the user's cart and returns a receipt.        |
