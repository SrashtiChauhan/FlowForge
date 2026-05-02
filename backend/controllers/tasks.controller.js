import supabase from "../config/db.js";

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("position", { ascending: true });

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, position } = req.body;
    
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title, description, status, position }])
      .select();

    if (error) throw error;
    
    // Emit event through socket
    const io = req.app.get("io");
    if (io && data.length > 0) {
      io.emit("task-created", data[0]);
    }
    
    res.status(201).json(data[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// Update task status and position
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, position } = req.body;

    const { data, error } = await supabase
      .from("tasks")
      .update({ status, position })
      .eq("id", id)
      .select();

    if (error) throw error;

    res.status(200).json(data[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) throw error;

    // Emit event through socket
    const io = req.app.get("io");
    if (io) {
      io.emit("task-deleted", id);
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
