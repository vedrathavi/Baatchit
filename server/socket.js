import { Server as SocketIoServer } from "socket.io";
import mongoose from "mongoose";

import Message from "./models/MessageModel.js";
import Channel from "./models/ChannelModel.js";
import { generateGeminiResponse } from "./services/GeminiServices.js";

const GEMINI_BOT_ID = new mongoose.Types.ObjectId(process.env.GEMINI_BOT_ID);

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

  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Message.create(message);
    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName image color")
      .populate("recipient", "id email firstName lastName image color");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("recieveMessage", messageData);
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit("recieveMessage", messageData);
    }
  };

  const sendChannelMessage = async (message) => {
    const { channelId, sender, content, messageType, fileUrl } = message;
    const createdMessage = await Message.create({
      sender,
      recipient: null,
      content,
      messageType,
      timestamp: new Date(),
      fileUrl,
    });

    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName image color")
      .exec();

    await Channel.findByIdAndUpdate(channelId, {
      $push: { messages: createdMessage._id },
    });

    const channel = await Channel.findById(channelId).populate("members");

    const finalData = { ...messageData._doc, channelId: channel._id };

    if (channel && channel.members) {
      channel.members.forEach((member) => {
        const memberSocketId = userSocketMap.get(member._id.toString());
        if (memberSocketId) {
          io.to(memberSocketId).emit("recieve-channel-message", finalData);
        }
      });

      const adminSocketId = userSocketMap.get(channel.admin._id.toString());
      if (adminSocketId) {
        io.to(adminSocketId).emit("recieve-channel-message", finalData);
      }
    }
  };

  const sendAIMessage = async (message) => {
    try {
      console.log("Received send-ai-message:", message);
      const { sender, content, messageType } = message;

      // Save user's message
      const userMessage = await Message.create({
        sender,
        recipient: GEMINI_BOT_ID,
        messageType,
        timestamp: new Date(),
        content,
      });

      const populatedUserMsg = await Message.findById(userMessage._id)
        .populate("sender", "id email firstName lastName image color")
        .exec();

      const senderSocketId = userSocketMap.get(sender);

      // Emit user's message back to sender client
      if (senderSocketId) {
        io.to(senderSocketId).emit("recieveMessage", populatedUserMsg);
      }

      // Get AI reply
      const aiResponseText = await generateGeminiResponse(content);

      // Save AI message
      const aiMessage = await Message.create({
        sender: GEMINI_BOT_ID,
        recipient: sender,
        messageType: "text",
        timestamp: new Date(),
        content: aiResponseText,
      });

      const populatedAiMsg = await Message.findById(aiMessage._id)
        .populate("sender", "id email firstName lastName image color")
        .exec();

      // Emit AI message back to sender client
      if (senderSocketId) {
        io.to(senderSocketId).emit("recieveMessage", populatedAiMsg);
      }
    } catch (err) {
      console.error("Error in send-ai-message:", err.message);
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

    socket.on("sendMessage", sendMessage);
    socket.on("disconnect", () => disconnect(socket));
    socket.on("send-channel-message", sendChannelMessage);
    socket.on("send-ai-message", (message) => sendAIMessage(message));
  });
};

export default setupSocket;
