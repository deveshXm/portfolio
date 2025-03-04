"use client";

import { useState, useEffect, useRef } from "react";
import { getAIResponse } from '../actions/ai';
import { getRandomQuestion } from '../utils/questions';

// Import the Message type from actions/ai.ts
import type { Message } from '../actions/ai';

export default function Home() {
  const [input, setInput] = useState("");

  // Initialize with default welcome message
  const [messages, setMessages] = useState<Message[]>([]);

  // Add a suggested question from Ada after initial render
  useEffect(() => {
    // Generate a random question for each session
    const randomQuestion = getRandomQuestion();

    // Small delay to make it feel like Ada is thinking of a suggestion
    const timer = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          text: randomQuestion,
          sender: "ai"
        }
      ]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Limit user input to 500 characters
    const userMessage = input.trim().slice(0, 500);

    // Add user message to the chat
    setMessages(prev => [...prev, { text: userMessage, sender: "user" }]);

    // Clear input field
    setInput("");

    // Show typing indicator
    setIsTyping(true);

    try {
      // Get the current conversation history before adding the new AI response
      // Use only the last 10 messages to limit context size
      const updatedMessages: Message[] = [...messages, { text: userMessage, sender: "user" as const }].slice(-10);

      // Get AI response from the Server Action with full conversation history
      const aiResponse = await getAIResponse(userMessage, updatedMessages);

      // Stop the typing indicator and add the AI's response
      setIsTyping(false);
      setMessages(prev => [...prev, { text: aiResponse, sender: "ai" }]);
    } catch (error) {
      // Handle any errors
      setIsTyping(false);
      setMessages(prev => [...prev, {
        text: "Sorry, I encountered an error processing your request. Please try again.",
        sender: "ai"
      }]);
      console.error("Error getting AI response:", error);
    }
  };

  // Block text logo
  const pixelLogo = `
  █████╗ ██████╗  █████╗ 
 ██╔══██╗██╔══██╗██╔══██╗
 ███████║██║  ██║███████║
 ██╔══██║██║  ██║██╔══██║
 ██║  ██║██████╔╝██║  ██║
 ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝
  `;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="pattern-background"></div>

      <div className="mac-window">
        <div className="title-bar">
          <div style={{ width: '12px' }}></div> {/* Empty space for balance */}
          <div className="title-text">Ada</div>
          <div style={{ width: '12px' }}></div> {/* Empty space for balance */}
        </div>

        <div className="window-content">
          <div className="ascii-art">{pixelLogo}</div>

          <div className="message-list">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-sender">
                  {message.sender === "ai" ? "Ada:" : "You:"}
                </div>
                <div className="message-content">{message.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="message ai">
                <div className="message-sender">Ada:</div>
                <div className="typing-indicator"></div>
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-field"
            placeholder="Type your message..."
            maxLength={500}
            autoFocus
          />
          <button type="submit" className="mac-button">Send</button>
        </form>

      </div>
      <div className="page-footer">
        <div className="contact-links">
          <a href="https://github.com/deveshXm" target="_blank" rel="noopener noreferrer">GitHub</a> •
          <a href="https://linkedin.com/in/devxm" target="_blank" rel="noopener noreferrer">LinkedIn</a> •
          <a href="https://x.com/_devesh16" target="_blank" rel="noopener noreferrer">X</a> •
          <a href="mailto:meenadevesh2003@gmail.com">Email</a> •
          <a href="https://calendly.com/deveshmeena/meet" target="_blank" rel="noopener noreferrer">Calendly</a>
        </div>
        <div className="copyright">© 2024 deveshmeena.com. All rights reserved.</div>
      </div>
    </div>
  );
}