import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

console.log("GEMINI_KEY loaded:", process.env.GEMINI_KEY ? "Yes" : "No");

export const generateGeminiResponse = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    console.log("in geminiServices.js", response.text);
    return response.text;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
