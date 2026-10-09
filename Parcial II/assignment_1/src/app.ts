import dotenv from 'dotenv';
import Server from './server';

// Load environment variables from the .env file
dotenv.config();

// Create a server instance
const server = new Server();

// Start the server
server.listen();