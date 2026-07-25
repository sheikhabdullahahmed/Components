const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 5000;

// Simple HTTP route
app.get('/', (req, res) => {
  res.send({ status: 'OK', message: 'Socket.IO Server is running' });
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS support
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for dev/testing
    methods: ['GET', 'POST']
  }
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log(`[Socket.IO] Client connected: ${socket.id}`);

  // Send a welcome event to the connected client
  socket.emit('welcome', {
    message: 'Connected to Socket.IO Server successfully!',
    socketId: socket.id
  });

  // Listen for 'send_message' event from client
  socket.on('send_message', (data) => {
    console.log(`[Socket.IO] Message from ${socket.id}:`, data);

    // Broadcast message to all connected clients (including sender)
    io.emit('receive_message', {
      senderId: socket.id,
      data: data,
      timestamp: new Date().toISOString()
    });
  });

  // Generic 'message' event handler for standard string/json messages
  socket.on('message', (data) => {
    console.log(`[Socket.IO] Generic message from ${socket.id}:`, data);
    
    // Broadcast to all clients
    io.emit('message', {
      senderId: socket.id,
      content: data,
      timestamp: new Date().toISOString()
    });
  });

  // Handle client disconnect
  socket.on('disconnect', (reason) => {
    console.log(`[Socket.IO] Client disconnected: ${socket.id} (Reason: ${reason})`);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 HTTP Server running on http://localhost:${PORT}`);
  console.log(`🔌 Socket.IO Server active on http://localhost:${PORT}`);
});
