"use client";

import { useState } from "react";

const initialMessages = [
  { user: "Shrinivas", text: "Hey team 👋" },
  { user: "Rahul", text: "Working on API" },
  { user: "Aman", text: "UI looks good!" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { user: "You", text: trimmed }]);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div className="mx-auto flex h-[80vh] w-full max-w-5xl flex-col p-4 md:p-10">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">Team Chat</h1>

      <div className="panel flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div key={i} className="rounded-lg border border-(--line) bg-(--bg-soft) p-3">
            <p className="font-semibold text-slate-900">{msg.user}</p>
            <p className="text-sm text-slate-700">{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 rounded-lg border border-(--line) bg-white p-3 text-slate-900 outline-none ring-teal-600/20 placeholder:text-slate-400 focus:ring"
        />
        <button
          onClick={handleSend}
          className="accent-btn rounded-lg px-5 font-semibold transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}