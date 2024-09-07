const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const taskRoutes = require('./routes/taskRoute');
const socketIO = require('socket.io');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// WebSockets setup (optional)
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('User connected');
});