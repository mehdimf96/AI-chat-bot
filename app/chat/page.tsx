"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/auth-store";
// import OpenAI from "openai";
// import api from "../../lib/axios";

import { useChat } from "ai/react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();
  // const [message, setMessage] = useState("");
  // const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const isValid = await checkAuth();
      if (!isValid) {
        router.push("/login");
      }
    };
    verifyAuth();
  }, [checkAuth, router]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!message.trim()) return;

  //   setIsLoading(true);
  //   try {
  //     const { data } = await api.post("/api/chat", { message });
  //     setResponse(data.response);
  //     setMessage("");
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setResponse("Sorry, there was an error processing your request.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Checking authentication...</h2>
          <p className="text-gray-500">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col bg-[url('/bg.png')] bg-cover bg-center">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 " />
              <p className="font-semibold">
                <span style={{ color: "#59c6d0" }}>AI</span>Support
              </p>
            </div>
            <button className="px-3 py-1 bg-gray-900 text-white rounded-md text-sm">
              + New Chat
            </button>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md"
            />
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div className="text-sm text-gray-500">Today</div>
            <div className="p-3 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
              Sample chat title
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="text-sm">
                <div className="font-medium">Username</div>
                <div className="text-gray-500">user@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Message bubbles will go here */}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`whitespace-pre-wrap max-w-fit p-2 rounded-md ${
                  m.role === "user" ? "bg-gray-100 ml-auto" : "bg-white"
                }`}
              >
                {m.role === "user" ? "User: " : "AI: "} {m.content}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          {/* <div className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black text-white rounded-md"
              onClick={() => {
                if (message.trim()) {
                  // TODO: Send message
                  setMessage("");
                }
              }}
            >
              Send
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 text-right">
            This chatbot can make mistakes. Check important info.
          </div> */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message here..."
                rows={4}
              /> */}
              <input
                className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                value={input}
                placeholder="Say something..."
                onChange={handleInputChange}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2  text-white rounded-md disabled:bg-gray-400"
                style={{ backgroundColor: "#59c6d0" }}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
          {/* 
          {Response && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="font-semibold mb-2">Response:</h3>
              <p className="whitespace-pre-wrap">{response}</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
