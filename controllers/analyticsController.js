const Task = require('../models/Task');

exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Run multiple calculations at once
    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({ user: userId, status: 'Completed' });
    const overdueTasks = await Task.find({ user: userId }).then(tasks => 
      tasks.filter(t => t.isOverdue).length
    );

    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    res.json({
      totalTasks,
      completedTasks,
      overdueTasks,
      completionRate: `${completionRate.toFixed(2)}%`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};