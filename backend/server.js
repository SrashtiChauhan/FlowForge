import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import chatRoutes from "./routes/chat.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

app.set("io", io);

const onlineUsers = new Map(); // socket.id -> username

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FlowForge Backend Running 🚀");
});

app.use("/api/chat", chatRoutes);
app.use("/api/tasks", taskRoutes);

io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  // JOIN
  socket.on("join", (username) => {
    onlineUsers.set(socket.id, username);
    io.emit("onlineUsers", Array.from(onlineUsers.values()));
  });

  // TYPING
  socket.on("typing", (username) => {
    socket.broadcast.emit("typing", username);
  });

  // SEEN
  socket.on("seen", (messageId) => {
    io.emit("messageSeen", messageId);
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(socket.id);
    io.emit("onlineUsers", Array.from(onlineUsers.values()));
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});