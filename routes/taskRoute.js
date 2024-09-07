const express = require("express");
const { createTask, updateTask, deleteTask, getTasks, getTaskById } = require("../controllers/taskController");
const { protect } = require("../middlewares/authMiddleware");
const { roleBasedAccess } = require("../middlewares/roleMiddleware");
const router = express.Router();

router.post("/", protect, roleBasedAccess(["admin", "manager"]), createTask);
router.patch("/:id", protect, roleBasedAccess(["admin", "manager"]), updateTask);
router.delete("/:id", protect, roleBasedAccess(["admin", "manager"]), deleteTask);
router.get("/all-tasks", getTasks);
router.get('/:id', protect, roleBasedAccess(["admin", "manager", "user"]), getTaskById)

module.exports = router;
