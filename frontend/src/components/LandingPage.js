import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleNewChat = async () => {
    const res = await fetch("http://localhost:4000/api/new-chat");
    const data = await res.json();
    navigate(`/chat/${data.session.id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-10">
      <h1 className="text-4xl font-bold mb-6">Welcome to Lumibyte AI</h1>
      <button
        onClick={handleNewChat}
        className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
      >
        Start New Chat
      </button>
    </div>
  );
}

export default LandingPage;
