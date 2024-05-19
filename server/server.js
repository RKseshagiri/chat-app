const express = require("express");
require('dotenv').config();
const cors = require("cors");
const http = require("http");
const cookieParser = require('cookie-parser');
const { authenticateSocket } = require("./middlewares/authMiddleware");

const connectMongoDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  },
});

app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.set("socketio", io);
app.io = io;

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

io.use(authenticateSocket);

// Handle Socket.io connections
io.on("connection", (socket) => {
  console.log(`Socket successfully connected with id: ${socket.id}`);
  
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


server.listen(PORT, () => { // Change app.listen to server.listen
  connectMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
