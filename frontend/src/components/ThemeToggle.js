import React from "react";

function ThemeToggle({ toggleTheme, theme }) {
  return (
    <button
      onClick={toggleTheme}
      className="mt-4 px-3 py-2 bg-gray-300 dark:bg-gray-700 text-sm rounded"
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}

export default ThemeToggle;
