"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

type Message = {
  user: string;
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<Socket | null>(null);

  // Fetch existing messages and subscribe to new ones
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/chat`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((msg: { text: string }) => ({
          user: "User",
          text: msg.text,
        }));
        setMessages(formatted);
      })
      .catch((err) => console.error(err));

    const socket = io(BACKEND_URL);
    socketRef.current = socket;

    socket.on("newMessage", (msg: { text: string }) => {
      setMessages((prev) => [...prev, { user: "User", text: msg.text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  //  Send message
  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    setInput("");

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: trimmed }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Failed to send message:", err);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div className="mx-auto flex h-[80vh] w-full max-w-5xl flex-col p-4 md:p-10">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">
        Team Chat
      </h1>

      <div className="panel flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="rounded-lg border border-(--line) bg-(--bg-soft) p-3"
          >
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