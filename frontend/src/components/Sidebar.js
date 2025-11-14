import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Sidebar({ toggleTheme, theme }) {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  const loadSessions = async () => {
    const res = await fetch("http://localhost:4000/api/sessions");
    const data = await res.json();
    setSessions(data.sessions || []);
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleNewChat = async () => {
    const res = await fetch("http://localhost:4000/api/new-chat");
    const data = await res.json();
    navigate(`/chat/${data.session.id}`);
  };

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 p-4 flex flex-col">
      <button
        onClick={handleNewChat}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + New Chat
      </button>

      <h2 className="text-lg font-semibold mb-2">Recent Sessions</h2>

      <ul className="flex-1 overflow-y-auto space-y-1">
        {sessions.map((s) => (
          <li key={s.id}>
            <Link
              to={`/chat/${s.id}`}
              className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {s.title}
            </Link>
          </li>
        ))}
      </ul>

      <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
    </div>
  );
}

export default Sidebar;
