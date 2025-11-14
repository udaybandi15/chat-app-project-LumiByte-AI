// backend/mockData.js
// Simple in-memory mock data for the Lumibyte simplified chat app (ES Modules)

const now = () => new Date().toISOString();

export const sessions = [
  {
    id: "sess-1",
    title: "Project plan: Marketing Q4",
    createdAt: now(),
    lastUpdated: now(),
  },
  {
    id: "sess-2",
    title: "Sales report summary",
    createdAt: now(),
    lastUpdated: now(),
  },
];

// conversation data store
export const conversations = {
  "sess-1": [
    {
      role: "system",
      text: "System: Conversation created for Project plan: Marketing Q4",
      timestamp: now(),
    },
    {
      role: "user",
      text: "Give me a 3-point marketing plan for Q4.",
      timestamp: now(),
    },
    {
      role: "assistant",
      text: "Here's a concise 3-point marketing plan for Q4.",
      timestamp: now(),
      structured: {
        type: "table",
        columns: ["Priority", "Action", "Owner", "Due"],
        rows: [
          [
            "High",
            "Holiday paid ads (Facebook/Instagram)",
            "Marketing",
            "2025-11-30",
          ],
          ["Medium", "Email re-engagement campaign", "Growth", "2025-12-10"],
          [
            "Low",
            "Content: 4 blog posts + 2 case studies",
            "Content",
            "2025-12-31",
          ],
        ],
      },
    },
  ],

  "sess-2": [
    {
      role: "system",
      text: "System: Conversation created for Sales report summary",
      timestamp: now(),
    },
    {
      role: "user",
      text: "Summarize this month's sales numbers.",
      timestamp: now(),
    },
    {
      role: "assistant",
      text: "Summary: revenue up 8% vs last month.",
      timestamp: now(),
      structured: {
        type: "table",
        columns: ["Metric", "This month", "Last month", "Delta"],
        rows: [
          ["Revenue", "$108,000", "$100,000", "+8%"],
          ["New customers", "420", "390", "+7.7%"],
          ["Churn rate", "3.1%", "3.5%", "-0.4pp"],
        ],
      },
    },
  ],
};

export function makeSession(title) {
  const id = `sess-${Math.random().toString(36).slice(2, 9)}`;
  const createdAt = now();

  const newMeta = {
    id,
    title: title || `Chat ${id}`,
    createdAt,
    lastUpdated: createdAt,
  };

  sessions.unshift(newMeta);
  conversations[id] = [
    { role: "system", text: `System: new session ${id}`, timestamp: createdAt },
  ];

  return newMeta;
}

export function appendMessage(sessionId, message) {
  message.timestamp = now();

  if (!conversations[sessionId]) conversations[sessionId] = [];

  conversations[sessionId].push(message);

  const meta = sessions.find((s) => s.id === sessionId);
  if (meta) meta.lastUpdated = message.timestamp;
}
