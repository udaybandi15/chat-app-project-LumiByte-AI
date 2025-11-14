import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ChatWindow from "./components/ChatWindow";
import Sidebar from "./components/Sidebar";

function App() {
  const [theme, setTheme] = useState("light");

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar toggleTheme={toggleTheme} theme={theme} />

      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat/:sessionId" element={<ChatWindow />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
