# GDSC BOWEN TASK

  This is a simple Express.js application using MongoDB for the database. The app allows users to interact with a RESTful API to perform CRUD operations.

# Features

  Express.js backend
  MongoDB integration using Mongoose

# Prerequisites

  Before setting up the app locally, ensure that you have the following installed on your machine:

  Node.js (v14.x or later)
  MongoDB (local instance or use MongoDB Atlas)
  
# Getting Started
  
  Follow these steps to set up and run the application locally.

  1. Clone the repository

  ```
  git clone https://github.com/ireoluwacodes/gdsc-task.git
  cd gdsc-task
  ```

  2. Install Dependencies
  Navigate into the project directory and install the necessary dependencies:

  ```
  npm install
  ```

  3. Set Up Environment Variables
  Create a .env file in the root of the project and add the variables in the .env.example

  4. Run the Application
  Once everything is set up, you can start the server with:

  ```
  npm start
  ```

  This will start the server on http://localhost:3000


# Scripts
  npm start: Runs the app in production mode.

  npm run dev: Runs the app in development 
  mode with auto-reload (using nodemon).

# Built With
  [Express](https://expressjs.com/) - Web framework for Node.js

  [MongoDB](https://www.mongodb.com/) - NoSQL database

  [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js