import { Router } from 'express';
import { shortenUrlController, redirectToOriginalUrl, homeController } from '../controllers/urlController';

/**
 * Router for handling URL-related routes.
 * 
 * - POST /shorten: Shortens a given URL.
 * - GET /:shortUrl: Redirects to the original URL associated with the short URL.
 * 
 * @example
 * // Shorten a URL
 * POST /shorten?url=https://example.com
 * 
 * // Redirect to the original URL
 * GET /abc123
 */
export const urlRouter = Router();

// Route to serve the homepage
urlRouter.get('/', homeController);

// Route to shorten a URL
urlRouter.post('/shorten', shortenUrlController);

// Route to redirect to the original URL    
urlRouter.get('/:shortUrl', redirectToOriginalUrl);

