const Task = require('../models/Task');

// CREATE: Add a new task
exports.createTask = async (req, res) => {
  try {
    // We pull the user ID from req.user (the token)
    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ: Get only the logged-in user's tasks
exports.getTasks = async (req, res) => {
  try {
    // Filter: Find tasks where user matches the person logged in
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE: Change a task (mark as completed, change deadline, etc.)
exports.updateTask = async (req, res) => {
  try {
    // Safety check: ensure the task belongs to the user
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, 
      req.body, 
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE: Remove a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};