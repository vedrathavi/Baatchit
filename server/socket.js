import { disconnect } from "mongoose";
import { Server as SocketIoServer } from "socket.io";
const setupSocket = (server) => {
  const io = new SocketIoServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`client disconnected:${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
      }
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User Connected:${userId} with socket ID:${socket.id}`);
    } else {
      console.log("User ID not provided during connection.");
    }

    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
