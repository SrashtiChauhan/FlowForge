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


//socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

//middleware
app.use(cors());
app.use(express.json());

//test route
app.get("/", (req, res) => {
  res.send("FlowForge Backend Running 🚀");
});

//routes
app.use("/api/chat", chatRoutes);
app.use("/api/tasks", taskRoutes);

//socket connection
io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  socket.on("task-moved", (data) => {
    // Broadcast the task-moved event to all other clients
    socket.broadcast.emit("task-moved", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});