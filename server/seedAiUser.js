// run it only once to create ai chat-bot as a user
// don't touch or run it ever again

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/UserModel.js";

dotenv.config();
await mongoose.connect(process.env.DATABASE_URL);

const existingAI = await User.findOne({ isAi: true });
if (existingAI) {
  console.log("Gemini user already exists");
  process.exit(0);
}

await User.create({
  email: "gemini@ai.bot",
  password: "Gemini@2005",
  firstName: "Gemini",
  lastName: "AI",
  isAi: true,
  color: 2,
  profileSetup: true,
});

console.log("Gemini Created");
process.exit(0);
