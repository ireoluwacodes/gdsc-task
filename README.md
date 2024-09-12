# GDSC BOWEN TASK

  This is a simple Express.js application using MongoDB for the database. The app demonstrates simple auth, google and apple social auth using passport.js. It also exposes CRUD endpoints for onboarding and user profile.

# Features

  Express.js backend

  MongoDB integration using Mongoose

  Passport.js auth

  Cloudinary file upload

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
  ```
  npm start
  ```
   Runs the app in production mode.

  ```
  npm run dev
  ```
  Runs the app in development mode with auto-reload (using nodemon).

# API Documentation can be found below
  ```
  https://documenter.getpostman.com/view/22684334/2sAXqne4d5
  ```

# Built With
  [Express](https://expressjs.com/) - Web framework for Node.js

  [MongoDB](https://www.mongodb.com/) - NoSQL database

  [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js

  [Passport.js](https://passportjs.org) - Social auth 

# Entity - Relationship Diagram
![ERD](./GDSC%20TASK(ER%20DIAGRAM).png)