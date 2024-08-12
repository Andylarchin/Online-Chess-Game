const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('chat message', (message) => {
    console.log('Received chat message on server:', message);
    io.emit('chat message', message);
    console.log('Message broadcasted');
  });
  
  socket.on('move', ({ from, to }) => {
    io.emit('move', { from, to });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});