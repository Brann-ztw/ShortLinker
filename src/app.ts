import express, { Application } from 'express';
import path from 'path';
import { urlRouter } from './routes/urlRoutes';

/**
 * Creates and configures an Express application.
 * 
 * - Serves static files from the "public/home" and "public/404" directories.
 * - Uses the URL router for handling URL-related routes.
 * 
 * @returns {Application} The configured Express application.
 * 
 * @example
 * const app = createApp();
 * app.listen(3000, () => console.log('Server running on port 3000'));
 */
export const createApp = (): Application => {
  const app: Application = express();

  // Serve static files from the "public/home" directory
  app.use(express.static(path.join(__dirname, '..', 'public', 'home')));

  // Serve static files from the "public/404" directory
  app.use(express.static(path.join(__dirname, '..', 'public', '404')));

  // Use the URL router for handling URL-related routes
  app.use('/', urlRouter);

  return app;
};

// Create and export the Express application
export const app = createApp();