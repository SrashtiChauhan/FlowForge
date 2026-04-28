"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

type Message = {
  id?: string;
  user: string;
  text: string;
  time?: string;
  status?: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);
  const [unreadCount, setUnreadCount] = useState(0);

  //  SOCKET SETUP
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socketRef.current = socket;

    // FETCH MESSAGES
    fetch("http://localhost:5000/api/chat")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((msg: any) => ({
          id: msg.id,
          user: msg.username,
          text: msg.text,
          time: new Date(msg.created_at).toLocaleTimeString(),
          status: msg.status || "sent",
        }));
        setMessages(formatted);
      });

// NEW MESSAGE
socket.on("newMessage", (msg) => {
  setMessages((prev) => [
    ...prev,
    {
      id: msg.id,
      user: msg.username,
      text: msg.text,
      time: new Date(msg.created_at).toLocaleTimeString(),
      status: msg.status,
    },
  ]);

  //  new logic
  if (!isAtBottomRef.current) {
    setUnreadCount((prev) => prev + 1);
  }
});
    // TYPING
    socket.on("typing", (user) => {
      setTypingUser(user);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setTypingUser("");
      }, 1500);
    });

    // ONLINE USERS
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // SEEN
    socket.on("messageSeen", (messageId) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: "seen" } : msg
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  //  JOIN USER
  useEffect(() => {
    if (socketRef.current && username.trim()) {
      socketRef.current.emit("join", username);
    }
  }, [username]);

  //  SMART AUTO SCROLL (FIXED)
  useEffect(() => {
    if (isAtBottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // MARK ONLY LAST MESSAGE AS SEEN (FIXED)
  useEffect(() => {
    if (!socketRef.current) return;

    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.id) {
      socketRef.current.emit("seen", lastMsg.id);
    }
  }, [messages]);

  // SEND
  async function handleSend() {
    if (!input.trim() || !username.trim()) return;

    await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input, username }),
    });

    setInput("");
  }

  // TYPING
  function handleTyping(e: any) {
    setInput(e.target.value);

    if (socketRef.current && username.trim()) {
      socketRef.current.emit("typing", username);
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto relative">
      <h1 className="text-2xl font-bold mb-3">Team Chat</h1>

      {/* USERNAME */}
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter name"
        className="mb-3 p-2 border rounded w-full"
      />

      {/* ONLINE USERS */}
      <div className="mb-2 text-sm text-green-600">
        Online: {onlineUsers.join(", ")}
      </div>

      {/* MESSAGES */}
      <div
  ref={containerRef}
  onScroll={() => {
    const el = containerRef.current;
    if (!el) return;

    const threshold = 100;

    const atBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

    isAtBottomRef.current = atBottom;

    //  reset unread when user reaches bottom
    if (atBottom) {
      setUnreadCount(0);
    }
  }}
  className="h-[400px] overflow-y-auto space-y-2 border p-3"
>
        {messages.map((msg, i) => {
           const prevMsg = messages[i - 1];
          const isSameUser = prevMsg && prevMsg.user === msg.user;
          const isMe = msg.user === username;

          return (
            <div
  key={i}
  className={`flex ${isMe ? "justify-end" : "justify-start"} ${
    isSameUser ? "mt-0.5" : "mt-3"
  }`}
>
              <div
                className={`p-3 max-w-xs shadow ${
  isMe
    ? `bg-green-500 text-white ${
        isSameUser
          ? "rounded-lg rounded-tr-2xl"
          : "rounded-2xl rounded-br-md"
      }`
    : `bg-gray-200 text-black ${
        isSameUser
          ? "rounded-lg rounded-tl-2xl"
          : "rounded-2xl rounded-bl-md"
      }`
}`}
              >
                {/* Show name only for others */}
                {!isMe && !isSameUser && (
                      <p className="font-semibold text-sm">{msg.user}</p>
                )}

                <p>{msg.text}</p>

                <p className="text-xs text-right opacity-70">
                  {msg.time} {msg.status === "seen" ? "✓✓" : "✓"}
                </p>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef}></div>
      </div>
      {unreadCount > 0 && (
  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
    <button
      onClick={() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        setUnreadCount(0);
      }}
      className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm shadow hover:bg-blue-600 transition"
    >
      {unreadCount} New Message{unreadCount > 1 ? "s" : ""}
    </button>
  </div>
)}

      {/* TYPING */}
      {typingUser && typingUser !== username && (
        <p className="text-sm italic mt-1">
          {typingUser} is typing...
        </p>
      )}

      {/* INPUT */}
      <div className="flex mt-3 gap-2">
        <input
          value={input}
          onChange={handleTyping}
          placeholder="Type message"
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}