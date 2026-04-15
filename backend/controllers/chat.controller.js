import supabase from "../config/db.js";

// GET messages
export const getMessages = async (req, res) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

// SEND message
export const sendMessage = async (req, res) => {
  const { text } = req.body;

  const { data, error } = await supabase
    .from("messages")
    .insert([{ text }])
    .select();

  if (error) return res.status(500).json({ error: error.message });

  if (!data || data.length === 0) {
    return res.status(500).json({ error: "Message not saved" });
  }

  const io = req.app.get("io");
  if (io) {
    io.emit("newMessage", data[0]);
  }

  res.json(data);
};