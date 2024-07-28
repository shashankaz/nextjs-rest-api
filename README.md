# NextJS REST API

## Overview
This project is focused on creating a comprehensive blog REST API using Next.js and TypeScript. It provides a robust backend for managing blog posts, categories, and users. The API is built using Next.js API routes, with TypeScript providing type safety and improved developer experience. MongoDB is used as the database to store user, category, and blog post data.

## Features
- CRUD operations for blog posts
- Category management
- Efficient data handling with MongoDB

## Technologies Used
- **Next.js**: A React framework for production
- **TypeScript**: A strongly typed programming language that builds on JavaScript
- **MongoDB**: A NoSQL database for storing blog data
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js

## Endpoints

### User Management
- `GET /api/users`: Get all users
- `POST /api/users`: Create a new user
- `PATCH /api/users`: Update user data
- `DELETE /api/users`: Delete user

### Blog Management
- `GET /api/blogs`: Get all blogs
- `POST /api/blogs`: Create a new blog
- `GET /api/blogs/:blogId`: Get a blog by ID
- `PATCH /api/blogs/:blogId`: Update a blog by ID
- `DELETE /api/blogs/:blogId`: Delete a blog by ID

### Category Management
- `GET /api/categories`: Get all categories
- `POST /api/categories`: Create a new category
- `PATCH /api/categories/:categoryId`: Update a category by ID
- `DELETE /api/categories/:categoryId`: Delete a category by ID

## Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/shashankaz/nextjs-rest-api.git
   cd nextjs-rest-api
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env.local` file in the root directory and add the following environment variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The server will start at [http://localhost:3000](http://localhost:3000).
