require("dotenv").config();
const express = require("express");
const http = require("http");

const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
     cors: {
          origin: "https://node-chat-system.vercel.app/",
          methods: ["GET", "POST"],
     },
});

// Middleware
app.use(cors());
app.use(express.static("public"));

// Test route
// app.get("/", (req, res) => {
//      res.redirect("Chat Server Running 🚀");
// });

app.use(express.static("public"));

// Socket connection
io.on("connection", (socket) => {
     console.log("User connected:", socket.id);

     // Listen for chat messages
     socket.on("chat_message", (data) => {
          console.log("Message received:", data);

          // broadcast to all clients
          io.emit("chat_message", {
               message: data.message,
               user: data.user,
               time: new Date().toLocaleTimeString(),
          });
     });

     socket.on("disconnect", () => {
          console.log("User disconnected:", socket.id);
     });
});

// Start server
const PORT = process.env.PORT;

server.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
});