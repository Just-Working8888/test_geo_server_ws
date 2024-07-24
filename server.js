const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
  path: '/location',
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('sendLocation', (data) => {
    console.log('Received:', data);
    io.emit('receiveLocation', data); 
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
