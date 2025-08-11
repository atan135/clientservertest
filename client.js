// tcp-client.js
const net = require("net");

// Create a TCP client
const client = new net.Socket();

// Server connection details
const HOST = "127.0.0.1";
const PORT = 8080;

// Connect to the server
client.connect(PORT, HOST, () => {
  console.log(`Connected to server at ${HOST}:${PORT}`);

  // Send a message to the server
  client.write("Hello Server!");
});

// Handle data received from the server
client.on("data", (data) => {
  console.log("Received from server: " + data);

  // wait some seconds
  let timewait = Math.floor(Math.random() * 1000);
  console.log(`waiting ${timewait} ms`);
  setTimeout(() => {
    client.write("Hello Server again! after time " + timewait + " ms");
  }, timewait);
});

// Handle connection close
client.on("close", () => {
  console.log("Connection closed");
});

// Handle connection errors
client.on("error", (err) => {
  console.log("Connection error: " + err);
});
