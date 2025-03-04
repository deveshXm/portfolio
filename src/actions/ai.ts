'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prompt } from "./prompt";

// Export the Message type so it can be imported in other files
export type Message = {
  text: string;
  sender: "user" | "ai";
};

export async function getAIResponse(userMessage: string, conversationHistory: Message[] = []): Promise<string> {
  // Enforce character limit for security
  userMessage = userMessage.slice(0, 500);
  
  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // System instructions to guide the model response
  const systemInstruction = prompt;

  try {
    // Take only the last 10 messages from conversation history as a safety check
    const limitedHistory = conversationHistory.slice(-10);
    
    // Convert conversation history to the format expected by Gemini
    const contents = limitedHistory.length > 0 
      ? limitedHistory.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }))
      : [];
    
    // Add the current user message if it's not already included in the history
    if (!limitedHistory.length || 
        limitedHistory[limitedHistory.length - 1].sender !== 'user' || 
        limitedHistory[limitedHistory.length - 1].text !== userMessage) {
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });
    }

    // Generate content using Gemini with conversation history for context
    const result = await model.generateContent({
      contents,
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
      },
      systemInstruction
    });

    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    // Fallback response if API call fails
    return "I'm having trouble connecting to my systems right now. Please try again in a moment, or feel free to ask about Devesh's skills, projects, or experience directly.";
  }
}