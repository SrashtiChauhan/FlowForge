"use client";

const messages = [
  { user: "Shrinivas", text: "Hey team 👋" },
  { user: "Rahul", text: "Working on API" },
  { user: "Aman", text: "UI looks good!" },
];

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[80vh]">

      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Team Chat</h1>

      {/* Messages */}
      <div className="flex-1 bg-zinc-900 p-4 rounded-xl border border-zinc-800 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className="bg-zinc-800 p-3 rounded-lg">
            <p className="font-semibold">{msg.user}</p>
            <p className="text-zinc-300 text-sm">{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg bg-zinc-800 border border-zinc-700"
        />
        <button className="bg-indigo-600 px-4 rounded-lg hover:bg-indigo-500">
          Send
        </button>
      </div>

    </div>
  );
}