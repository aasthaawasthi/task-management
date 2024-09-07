const Task = require('../models/taskModel');
const Activity = require('../models/activityModel');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    await Activity.create({ action: 'created', taskId: task._id, userId: req.user._id });
    res.status(201).json({ message: 'Task created', task });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await Activity.create({ action: 'updated', taskId: task._id, userId: req.user._id });
    res.json({ message: 'Task updated', task });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    await Activity.create({ action: 'deleted', taskId: req.params.id, userId: req.user._id });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};
