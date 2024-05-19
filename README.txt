# Real-Time Chat Application

## Overview

This project is a real-time chat application with the following features:
- Chat room accessible to authenticated users.
- User authentication system.
- Demo credentials for easy testing.
- Real-time message updates using WebSockets.

## Technologies Used

### Frontend
- React
- CSS (for styling)
- Socket.io-client

### Backend
- Node.js
- Express
- MongoDB (using Mongoose for ORM)
- Socket.io

## Features

1. **Universal Chat Room**: All authenticated users can join a single chat room and exchange messages in real-time.
2. **Authentication**: Secure login system to ensure only authenticated users can access the chat room.
3. **Real-Time Communication**: Instant message updates for all users using WebSockets.
4. **Security**: Input sanitization to prevent XSS.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running.
- MongoDB Compass installed for easy data import.

### Installation

1. Install backend dependencies:
    ```bash
    npm install
    ```

2. Install frontend dependencies:
    ```bash
    cd client
    npm install
    ```

### Import Initial Data into MongoDB using MongoDB Compass

To import the initial data into MongoDB, follow these steps:

1. **Download and Install MongoDB Compass**:
   - You can download MongoDB Compass from the [official MongoDB website](https://www.mongodb.com/products/compass).

2. **Connect to Your MongoDB Instance**:
   - Open MongoDB Compass.
   - In the connection dialog, enter your MongoDB connection string. For a local MongoDB instance, you can use `mongodb://localhost:27017`.
   - Click on `Connect`.

3. **Import JSON Files**:
   - Once connected, you will see your MongoDB databases listed.
   - Select the `chat-app` database. If it does not exist, you can create it by clicking on `Create Database`.
   - After selecting the `chat-app` database, you need to create the collections if they do not already exist.
     - Click on `Create Collection` and name it `messages`.
     - Click on `Create Collection` again and name it `users`.
   - Now, import the JSON files into the respective collections:
     - Select the `messages` collection.
     - Click on `Add Data` and choose `Import File`.
     - Choose `JSON` as the file type.
     - Click on `Select File` and choose `chat-app.messages.json`.
     - Click `Import` to import the data.
     - Repeat these steps for the `users` collection using the `chat-app.users.json` file.

### Running the Application

1. Start the backend server:
    ```bash
    npm run server  # or npm run dev (for nodemon)
    ```

    The backend server should now be running on `http://localhost:5000`.

2. Start the frontend development server:
    ```bash
    cd client
    npm start
    ```

    The frontend development server should now be running on `http://localhost:3000`.

### Demo Credentials



To access the chat room, use the following demo credentials:

**Once import the data file to mongo db to access using demo account**

- **Username**: demo1
- **Password**: 123456

- **Username**: demo2
- **Password**: 123456

- **Username**: demo3
- **Password**: 123456

### Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Enter the demo credentials on the login page.
3. Once authenticated, you will be redirected to the chat room where you can send and receive messages in real-time.

## Security Measures

- **Sanitization**: The application uses the `xss` library to sanitize all user inputs to prevent XSS attacks.
- **Validation**: The `Joi` library is used for input validation on the backend to ensure data integrity.

---
