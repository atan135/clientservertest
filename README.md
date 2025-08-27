# Node.js TCP Client-Server Project

A simple TCP client-server implementation using Node.js built-in `net` module. This project demonstrates basic TCP socket communication between a client and server.

## Features

- **TCP Server**: Listens for client connections and echoes back received messages
- **TCP Client**: Connects to server, sends messages, and handles responses
- **Real-time Communication**: Bidirectional message exchange with random timing simulation
- **Error Handling**: Comprehensive error handling for connection issues

## Project Structure

```
node-test-client/
├── server.js      # TCP server implementation
├── client.js      # TCP client implementation
├── package.json   # Project dependencies and metadata
└── README.md      # This file
```

## Prerequisites

- Node.js (version 12 or higher)
- npm (comes with Node.js)

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd node-test-client
   ```
3. Install dependencies (if any):
   ```bash
   npm install
   ```

## Usage

### Starting the Server

1. Open a terminal/command prompt
2. Navigate to the project directory
3. Start the server:
   ```bash
   node server.js
   ```
4. You should see: `Server listening on 127.0.0.1:8080`

### Running the Client

1. Open another terminal/command prompt
2. Navigate to the project directory
3. Run the client:
   ```bash
   node client.js
   ```
4. You should see: `Connected to server at 127.0.0.1:8080`

## How It Works

### Server (`server.js`)
- Creates a TCP server listening on port 8080
- Accepts client connections
- Echoes back any received messages
- Handles client disconnections and errors

### Client (`client.js`)
- Connects to the server at `127.0.0.1:8080`
- Sends initial "Hello Server!" message
- Receives server responses
- Sends follow-up messages with random delays (0-1000ms)
- Handles connection events and errors

## Configuration

The server and client are configured to use:
- **Host**: `127.0.0.1` (localhost)
- **Port**: `8080`

You can modify these values in both `server.js` and `client.js` files if needed.

## Example Output

### Server Output:
```
Server listening on 127.0.0.1:8080
Client connected from 127.0.0.1:12345
Received from client: Hello Server!
Received from client: Hello Server again! after time 456 ms
Client 127.0.0.1 disconnected
```

### Client Output:
```
Connected to server at 127.0.0.1:8080
Received from server: Welcome to the server!
Received from server: Server received: Hello Server!
waiting 456 ms
Received from server: Server received: Hello Server again! after time 456 ms
Connection closed
```

## Troubleshooting

### Common Issues

1. **Port already in use**: If port 8080 is occupied, change the PORT constant in both files
2. **Connection refused**: Ensure the server is running before starting the client
3. **Permission denied**: On some systems, you might need to run with elevated privileges

### Error Handling

The application includes comprehensive error handling for:
- Connection failures
- Network errors
- Socket errors
- Unexpected disconnections

## Development

This project serves as a foundation for more complex TCP-based applications. You can extend it by:

- Adding message protocols
- Implementing multiple client support
- Adding authentication
- Creating persistent connections
- Building custom message formats

## License

ISC License - see `package.json` for details.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this project.
