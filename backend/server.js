// backend/server.js (ES Modules version)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import {
  sessions,
  conversations,
  makeSession,
  appendMessage,
} from "./mockData.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// GET /api/sessions
app.get("/api/sessions", (req, res) => {
  const list = sessions.map((s) => ({
    id: s.id,
    title: s.title,
    createdAt: s.createdAt,
    lastUpdated: s.lastUpdated,
  }));
  res.json({ ok: true, sessions: list });
});

// GET /api/new-chat
app.get("/api/new-chat", (req, res) => {
  const title = req.query.title || "New Chat";
  const newMeta = makeSession(title);
  res.json({ ok: true, session: newMeta });
});

// GET /api/session/:id
app.get("/api/session/:id", (req, res) => {
  const id = req.params.id;
  const convo = conversations[id];

  if (!convo) {
    return res.status(404).json({ ok: false, error: "session_not_found" });
  }

  res.json({ ok: true, sessionId: id, messages: convo });
});

// POST /api/chat/:id
app.post("/api/chat/:id", (req, res) => {
  const id = req.params.id;
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({
      ok: false,
      error: "invalid_payload",
      message: "Provide { message: string }",
    });
  }

  // Ensure session exists
  if (!conversations[id]) {
    makeSession(`Recovered ${id}`);
  }

  // Store user message
  appendMessage(id, { role: "user", text: message });

  // Mock assistant response
  const lower = message.toLowerCase();
  let assistantText = "Default mock response.";
  let structured = null;

  // Smart mock rules
  if (
    lower.includes("table") ||
    (lower.includes("show") && lower.includes("data"))
  ) {
    assistantText = "Here's a mock table of results.";
    structured = {
      type: "table",
      columns: ["id", "name", "value"],
      rows: [
        ["1", "Alpha", "23"],
        ["2", "Beta", "57"],
        ["3", "Gamma", "91"],
      ],
    };
  } else if (lower.includes("summary") || lower.includes("summarize")) {
    assistantText = "Here's a summary of the KPIs.";
    structured = {
      type: "table",
      columns: ["KPI", "Current", "Previous", "Change"],
      rows: [
        ["Revenue", "$120,000", "$110,000", "+9%"],
        ["Active Users", "8,400", "7,900", "+6%"],
        ["Conversion", "3.2%", "3.1%", "+0.1%"],
      ],
    };
  } else {
    assistantText = `Echo: ${message}`;
    structured = {
      type: "table",
      columns: ["example", "value"],
      rows: [["echo", message.slice(0, 40)]],
    };
  }

  const assistantMsg = { role: "assistant", text: assistantText, structured };
  appendMessage(id, assistantMsg);

  res.json({ ok: true, response: assistantMsg, sessionId: id });
});

// Health check
app.get("/api/health", (req, res) =>
  res.json({ ok: true, uptime: process.uptime() })
);

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
