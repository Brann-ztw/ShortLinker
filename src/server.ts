import * as dotenv from 'dotenv';
import { Application } from 'express';
import { createApp } from './app';

/**
 * Configures and starts the Express server.
 * 
 * - Loads environment variables from a `.env` file.
 * - Creates an Express application using the `createApp` function.
 * - Starts the server on the specified port (default: 3000).
 * 
 * @example
 * // Start the server
 * startServer();
 */
const startServer = (): void => {
  // Load environment variables from .env file
  dotenv.config();

  // Create the Express application
  const app: Application = createApp();

  // Get the port from environment variables or use a default value
  const PORT: string | number = process.env.PORT || 3000;

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Start the server
startServer();