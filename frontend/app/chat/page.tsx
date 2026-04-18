"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000")

type Message = {
  user: string;
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Fetch messages 
  useEffect(() => {
    fetch("http://localhost:5000/api/chat")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((msg: any) => ({
          user: "User",
          text: msg.text,
        }));
        setMessages(formatted);
      })
      .catch((err) => console.error(err));
  
      socket.on("newMessage", (msg)=> {
        setMessages((prev)=> [
          ...prev,
          {user: "User",text:msg.text},
        ]);
      });
      return()=> {
        socket.off("newMessage");
      };
  },[]);

  //  Send message
  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: trimmed }),
      });

      const data = await res.json();

      if (!data || data.length === 0) return;

      const newMsg = data[0];

      

      setInput("");
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