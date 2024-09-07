const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const taskRoutes = require('./routes/taskRoute');
const activityRoutes = require('./routes/activityRoute');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/activity', activityRoutes);

// WebSockets setup
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('User connected');
  
  // Push updates when a task is created/updated/completed
  socket.on('taskUpdated', (data) => {
    io.emit('activityFeedUpdate', data); // Broadcast update to all users
  });
});
