const express = require('express');
const { createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');
const { roleBasedAccess } = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/', protect, roleBasedAccess(['admin', 'manager']), createTask);
router.put('/:id', protect, roleBasedAccess(['admin', 'manager']), updateTask);
router.delete('/:id', protect, roleBasedAccess(['admin', 'manager']), deleteTask);

module.exports = router;
