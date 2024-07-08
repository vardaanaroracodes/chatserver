const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const chatRoutes = require('./routes/chatRoutes');
const authRoutes = require('./routes/authRoutes');
const Message = require('./models/message');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('join', ({ sender, receiver }) => {
    const room = [sender, receiver].sort().join('_');
    socket.join(room);
  });

  socket.on('sendMessage', async ({ sender, receiver, message }) => {
    const newMessage = new Message({ sender, receiver, message });
    await newMessage.save();
    const room = [sender, receiver].sort().join('_');
    io.to(room).emit('message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));