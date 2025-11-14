import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";
import TableResponse from "./TableResponse";

function ChatWindow() {
  const { sessionId } = useParams();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // -----------------------------------------------
  // ✅ Load session history (wrapped in useCallback)
  // -----------------------------------------------
  const loadSession = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/session/${sessionId}`);
      const data = await res.json();
      setMessages(data.history || []);
    } catch (err) {
      console.error("Failed to load session:", err);
    }
  }, [sessionId]);

  // -----------------------------------------------
  // ✅ Fetch session on mount & when sessionId changes
  // -----------------------------------------------
  useEffect(() => {
    loadSession();
  }, [loadSession]);

  // -----------------------------------------------
  // ✅ Handle user sending a message
  // -----------------------------------------------
  const handleSend = async (userMessage) => {
    const userEntry = { role: "user", text: userMessage };
    setMessages((prev) => [...prev, userEntry]);

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/chat/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await res.json();

      const botEntry = {
        role: "assistant",
        text: data.answer,
        table: data.table || null,
      };

      setMessages((prev) => [...prev, botEntry]);
    } catch (err) {
      console.error("Chat error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Session: {sessionId}
        </h2>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-2xl ${
              msg.role === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 dark:bg-gray-800 dark:text-gray-100"
            }`}
          >
            <p>{msg.text}</p>

            {/* Render table if exists */}
            {msg.table && (
              <div className="mt-4">
                <TableResponse data={msg.table} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <p className="text-gray-600 dark:text-gray-300">Thinking...</p>
        )}
      </div>

      {/* Input Box */}
      <div className="border-t border-gray-300 dark:border-gray-700 p-3">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}

export default ChatWindow;
