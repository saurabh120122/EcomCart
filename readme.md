# 🛒 Vibe Commerce - Mock E-Commerce Cart

This project is a full-stack MERN application developed for the Vibe Commerce screening. It simulates a basic shopping cart's core functionality, including fetching products, adding/removing items from a cart, and a mock checkout process.

The backend is built with a modern, scalable architecture using Express.js, featuring global error handling and standardized API responses. The frontend is a responsive React application.

---

## 📸 Screenshots

*(You should add your own screenshots here!)*

| Product Page | Cart & Checkout | Receipt Modal |
| :---: | :---: | :---: |
|  | [Image of Cart Page] | [Image of Receipt] |

---

## ✨ Features

* **Product Listing:** Fetches mock products from the database.
* **Add to Cart:** Adds a selected product to the user's cart. Handles duplicate items by increasing quantity.
* **View Cart:** A detailed view of all items in the cart, sub-totals, and a final total.
* **Remove from Cart:** Allows users to remove items from their cart.
* **Mock Checkout:** A simple form (name/email) that, upon submission, mimics a checkout, clears the cart, and displays a receipt modal.
* **Persistent Data:** Cart and product data are stored in a MongoDB database.

---

## 🛠️ Tech Stack & Architecture

This project uses a monorepo structure with two main directories: `/frontend` and `/backend`.



### Backend (Node.js / Express / MongoDB)

* **Node.js (ESM):** Uses modern `import`/`export` (ES Module) syntax.
* **Express.js:** Fast, minimalist web framework for building the REST APIs.
* **MongoDB:** NoSQL database used to store product and cart data.
* **Mongoose:** Elegant an object data modeling (ODM) library for MongoDB and Node.js.
* **`dotenv`:** Manages secret keys and environment variables.

#### Key Architectural Features

This backend is not just a simple API; it's built using professional, reusable patterns:

* **`utils/asyncHandler.js`:** A higher-order function that wraps all asynchronous controller functions. It automatically catches any errors and passes them to the global error handler, eliminating the need for `try...catch` blocks in every controller.
* **`utils/ApiError.js`:** A custom `Error` class for creating predictable, operational errors with specific HTTP status codes.
* **`utils/ApiResponse.js`:** A custom class for sending consistent, standardized successful JSON responses.
* **`middlewares/errorHandler.js`:** A single, global error handling middleware that catches all errors (especially `ApiError` instances) and formats them into a clean JSON error response, so the server never crashes on an unhandled promise.

### Frontend (React)

* **React:** A component-based library for building the user interface.
* **React Router:** Handles all client-side routing (`/` and `/cart`).
* **Axios:** A promise-based HTTP client for making requests to the backend API.
* **CSS:** Clean, responsive styling using pure CSS with Flexbox and Grid.

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

* **Node.js** (v16.x or later)
* **npm** (comes with Node.js)
* **MongoDB Atlas Account** (or a local MongoDB instance). You will need a MongoDB Connection String (URI).

### 1. Clone the Repository

```sh
git clone [https://github.com/your-username/vibe-commerce-cart.git](https://github.com/your-username/vibe-commerce-cart.git)
cd vibe-commerce-cart
Got it. A great README.md is the most important file in your repository. It's the "front page" for your project.

Here is a complete, professional README.md file tailored specifically for the project we just built.

Copy and paste the entire block below into a new file named README.md in the root of your vibe-commerce-cart folder (the same folder that contains frontend and backend).

Markdown

# 🛒 Vibe Commerce - Mock E-Commerce Cart

This project is a full-stack MERN application developed for the Vibe Commerce screening. It simulates a basic shopping cart's core functionality, including fetching products, adding/removing items from a cart, and a mock checkout process.

The backend is built with a modern, scalable architecture using Express.js, featuring global error handling and standardized API responses. The frontend is a responsive React application.

---

## 📸 Screenshots

*(You should add your own screenshots here!)*

| Product Page | Cart & Checkout | Receipt Modal |
| :---: | :---: | :---: |
|  | [Image of Cart Page] | [Image of Receipt] |

---

## ✨ Features

* **Product Listing:** Fetches mock products from the database.
* **Add to Cart:** Adds a selected product to the user's cart. Handles duplicate items by increasing quantity.
* **View Cart:** A detailed view of all items in the cart, sub-totals, and a final total.
* **Remove from Cart:** Allows users to remove items from their cart.
* **Mock Checkout:** A simple form (name/email) that, upon submission, mimics a checkout, clears the cart, and displays a receipt modal.
* **Persistent Data:** Cart and product data are stored in a MongoDB database.

---

## 🛠️ Tech Stack & Architecture

This project uses a monorepo structure with two main directories: `/frontend` and `/backend`.



### Backend (Node.js / Express / MongoDB)

* **Node.js (ESM):** Uses modern `import`/`export` (ES Module) syntax.
* **Express.js:** Fast, minimalist web framework for building the REST APIs.
* **MongoDB:** NoSQL database used to store product and cart data.
* **Mongoose:** Elegant an object data modeling (ODM) library for MongoDB and Node.js.
* **`dotenv`:** Manages secret keys and environment variables.

#### Key Architectural Features

This backend is not just a simple API; it's built using professional, reusable patterns:

* **`utils/asyncHandler.js`:** A higher-order function that wraps all asynchronous controller functions. It automatically catches any errors and passes them to the global error handler, eliminating the need for `try...catch` blocks in every controller.
* **`utils/ApiError.js`:** A custom `Error` class for creating predictable, operational errors with specific HTTP status codes.
* **`utils/ApiResponse.js`:** A custom class for sending consistent, standardized successful JSON responses.
* **`middlewares/errorHandler.js`:** A single, global error handling middleware that catches all errors (especially `ApiError` instances) and formats them into a clean JSON error response, so the server never crashes on an unhandled promise.

### Frontend (React)

* **React:** A component-based library for building the user interface.
* **React Router:** Handles all client-side routing (`/` and `/cart`).
* **Axios:** A promise-based HTTP client for making requests to the backend API.
* **CSS:** Clean, responsive styling using pure CSS with Flexbox and Grid.

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

* **Node.js** (v16.x or later)
* **npm** (comes with Node.js)
* **MongoDB Atlas Account** (or a local MongoDB instance). You will need a MongoDB Connection String (URI).

### 1. Clone the Repository

```sh
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

📦 API Endpoints
All endpoints are prefixed with /api.

Products
GET /products

Description: Get all available products.

Response: 200 OK

Cart
GET /cart

Description: Get all items in the cart and the total price.

Response: 200 OK

POST /cart

Description: Add a new item to the cart or update an existing item's quantity.

Body: { "productId": "...", "quantity": 1 }

Response: 201 Created

DELETE /cart/:id

Description: Remove an item from the cart by its _id.

Response: 200 OK

Checkout
POST /checkout

Description: Mock checkout process. Clears the cart and returns a receipt.

Body: { "cartItems": [...], "total": 123.45 }

Response: 200 OK