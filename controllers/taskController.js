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
    // 1. Start with the "Must-Have": The Task must belong to the User
    let query = { user: req.user.id };

    // 2. Add Filtering (if the user provided it in the URL)
    if (req.query.status) query.status = req.query.status;
    if (req.query.priority) query.priority = req.query.priority;

    // 3. Add Search (Search for keywords in the Title)
    if (req.query.search) {
      // 'i' makes it case-insensitive (Search 'API' or 'api' works the same)
      query.title = { $regex: req.query.search, $options: 'i' };
    }

    // 4. Run the query
    const tasks = await Task.find(query).sort({ deadline: 1 }); // Sort by closest deadline first
    
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE: Change a task (mark as completed, change deadline, etc.)
exports.updateTask = async (req, res) => {
  try {
    // This findOneAndUpdate ensures the task _id exists AND belongs to the user
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }
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