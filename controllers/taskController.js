const Task = require("../models/taskModel");
const Activity = require("../models/activityModel");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    await Activity.create({
      action: "created",
      taskId: task._id,
      userId: req.user.userId,
    });
    return res.status(201).json({ message: "Task created", task });
  } catch (error) {
    return res.status(500).json({ message: "Error creating task", error });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await Activity.create({
      action: "updated",
      taskId: task._id,
      userId: req.user.userId,
    });
    return res.json({ message: "Task updated", task });
  } catch (error) {
    return res.status(500).json({ message: "Error updating task", error });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const existingTask = await Task.find({ _id: req.params.id });
    if (existingTask.length === 0) return res.status(400).json({ message: "No task exist with this id!" });
    await Task.findByIdAndDelete(req.params.id);
    await Activity.create({
      action: "deleted",
      taskId: req.params.id,
      userId: req.user.userId,
    });
    return res.json({ message: "Task deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting task", error });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (!tasks) return res.status(400).json({ message: "No task found!" });
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ message: "Error getting all tasks", error });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.find({ _id: req.params.id });
    if (!task) return res.status(400).json({ message: "No task found!" });
    return res.status(200).json({ task });
  }
  catch (error) {
    return res.status(500).json({ message: "Error getting task", error });
  }
};
