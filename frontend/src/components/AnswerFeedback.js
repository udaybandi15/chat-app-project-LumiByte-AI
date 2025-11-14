import React, { useState } from "react";

export default function AnswerFeedback() {
  const [state, setState] = useState(null); // 'like' | 'dislike' | null

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => setState(state === "like" ? null : "like")}
        className={`px-2 py-1 rounded ${
          state === "like"
            ? "bg-green-600 text-white"
            : "bg-gray-100 dark:bg-[#073046]"
        }`}
      >
        👍
      </button>
      <button
        onClick={() => setState(state === "dislike" ? null : "dislike")}
        className={`px-2 py-1 rounded ${
          state === "dislike"
            ? "bg-red-600 text-white"
            : "bg-gray-100 dark:bg-[#073046]"
        }`}
      >
        👎
      </button>
      {state && (
        <span className="ml-2 text-xs text-gray-400">
          Thanks for the feedback
        </span>
      )}
    </div>
  );
}
