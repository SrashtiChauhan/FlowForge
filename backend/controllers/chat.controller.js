import supabase from "../config/db.js";

export const getMessages = async (req, res) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

export const sendMessage = async (req, res) => {
  try {
    const { text, username } = req.body;

    console.log("Incoming:", text, username);

    if (!text || !username) {
      return res.status(400).json({ error: "Text & username required" });
    }

    const { data, error } = await supabase
      .from("messages")
      .insert([{ text, username, status: "sent" }])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    const io = req.app.get("io");

    io.emit("newMessage", {
      ...data[0],
      status: "delivered",
    });

    res.json(data);
  } catch (err) {
    console.error("Server crash:", err);
    res.status(500).json({ error: "Server error" });
  }
};