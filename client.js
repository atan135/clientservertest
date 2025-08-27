// tcp-client.js
const net = require("net");

// Configuration
const CONFIG = {
  HOST: process.env.HOST || "127.0.0.1",
  PORT: parseInt(process.env.PORT) || 8080,
  RECONNECT_DELAY: 5000,
  MAX_RECONNECT_ATTEMPTS: 5,
  MESSAGE_DELAY_MIN: 1000,
  MESSAGE_DELAY_MAX: 5000
};

// Client state
let reconnectAttempts = 0;
let isConnected = false;
let client = null;

// Utility functions
const log = (message, type = 'info') => {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌ ' : type === 'success' ? '✅ ' : 'ℹ️ ';
  console.log(`[${timestamp}] ${prefix} ${message}`);
};

const createClient = () => {
  client = new net.Socket();
  
  // Connect to the server
  client.connect(CONFIG.PORT, CONFIG.HOST, () => {
    isConnected = true;
    reconnectAttempts = 0;
    log(`Connected to server at ${CONFIG.HOST}:${CONFIG.PORT}`, 'success');
    
    // Send initial message
    sendMessage("Hello Server!");
  });

  // Handle data received from the server
  client.on("data", (data) => {
    const message = data.toString().trim();
    log(`Received from server: ${message}`);
    
    // Send follow-up message with random delay
    const delayMs = Math.floor(Math.random() * 
      (CONFIG.MESSAGE_DELAY_MAX - CONFIG.MESSAGE_DELAY_MIN)) + CONFIG.MESSAGE_DELAY_MIN;
    
    log(`Sending follow-up message in ${delayMs}ms`);
    setTimeout(() => {
      if (isConnected) {
        sendMessage(`Hello Server again! after ${delayMs}ms delay`);
      }
    }, delayMs);
  });

  // Handle connection close
  client.on("close", () => {
    isConnected = false;
    log("Connection closed");
    
    // Attempt reconnection if not manually closed
    if (reconnectAttempts < CONFIG.MAX_RECONNECT_ATTEMPTS) {
      reconnectAttempts++;
      log(`Attempting to reconnect... (${reconnectAttempts}/${CONFIG.MAX_RECONNECT_ATTEMPTS})`);
      setTimeout(createClient, CONFIG.RECONNECT_DELAY);
    } else {
      log(`Max reconnection attempts reached. Exiting.`, 'error');
      process.exit(1);
    }
  });

  // Handle connection errors
  client.on("error", (err) => {
    log(`Connection error: ${err.message}`, 'error');
  });
};

const sendMessage = (message) => {
  if (isConnected && client) {
    client.write(message);
    log(`Sent: ${message}`);
  } else {
    log("Cannot send message: not connected", 'error');
  }
};

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  log(`Received ${signal}. Closing connection gracefully...`);
  if (client && isConnected) {
    client.end();
  }
  process.exit(0);
};

// Handle process signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  log(`Uncaught Exception: ${err.message}`, 'error');
  log(err.stack, 'error');
  gracefulShutdown('uncaughtException');
});

// Display configuration
log(`Starting TCP client with configuration:`, 'info');
log(`  Host: ${CONFIG.HOST}`, 'info');
log(`  Port: ${CONFIG.PORT}`, 'info');
log(`  Reconnect attempts: ${CONFIG.MAX_RECONNECT_ATTEMPTS}`, 'info');
log(`  Message delay range: ${CONFIG.MESSAGE_DELAY_MIN}-${CONFIG.MESSAGE_DELAY_MAX}ms`, 'info');

// Start the client
createClient();
