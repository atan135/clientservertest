// tcp-server.js
const net = require("net");

// Server configuration
const HOST = "127.0.0.1";
const PORT = 8080;

// Create a TCP server
const server = net.createServer((socket) => {
  console.log(
    `Client connected from ${socket.remoteAddress}:${socket.remotePort}`
  );

  // Send a welcome message to the client
  socket.write("Welcome to the server!\n");

  // Handle data received from client
  socket.on("data", (data) => {
    console.log(`Received from client: ${data}`);

    // Echo the data back to the client
    socket.write(`Server received: ${data}`);
  });

  // Handle client disconnection
  socket.on("close", () => {
    console.log(`Client ${socket.remoteAddress} disconnected`);
  });

  // Handle client errors
  socket.on("error", (err) => {
    console.log(`Socket error: ${err}`);
  });
});

// Start server listening
server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});

// Handle server errors
server.on("error", (err) => {
  console.log(`Server error: ${err}`);
});
