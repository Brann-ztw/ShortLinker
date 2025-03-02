import { Request, response, Response } from 'express';
import { generateUniqueShortUrl } from '../services/urlService';
import { getOriginalUrl, writeData } from '../models/urlModel';
import { isURL } from 'validator';
import * as path from 'path';


/**
 * Handles the request to shorten a URL.
 * 
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @returns {Response} A JSON response with the shortened URL or an error message.
 * 
 * @example
 * // Request: GET /shorten?url=https://example.com
 * // Response: { shortenedUrl: 'www.example.com/sjndbhbdjsmsnnd' }
 */
export const shortenUrlController = async(request: Request, response: Response) => {
  try {
    // Extract the URL from the query parameters
    const { url: originalUrl } = request.query;

    // Validate the URL parameter
    if (!originalUrl) {
      response.status(400).json({ message: 'URL parameter is required' });
      return;
    }

    // Validate the URL
    if (!isURL(originalUrl as string)) {
      response.status(400).json({ message: 'Invalid URL' });
      return;
    }

    // Generate a unique short URL path
    const shortUrlPath: string = generateUniqueShortUrl();

    // Save the short URL and original URL to the data file
    await writeData({ [shortUrlPath]: originalUrl as string });

    // Get the host dynamically from the request object
    const host: string | undefined = request.get('host'); // Returns something like 'tuaplicacion.vercel.app'
    const protocol: string = request.protocol; // Returns 'http' or 'https'
    const baseHost: string = `${protocol}://${host}`; // Constructs the base URL (e.g., 'https://tuaplicacion.vercel.app')

    // Construct the full shortened URL using the dynamic host
    const shortenedUrl: string = `${baseHost}/${shortUrlPath}`;

    // Return the full shortened URL in the response
    response.status(200).json({ shortenedUrl });
  } catch (error) {
    console.error('Error in shortenUrlController:', error);
    response.status(500).json({ message: 'Internal server error' });
  }
}


/**
 * Redirects the user to the original URL associated with the provided short URL.
 * 
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @returns {void} Redirects to the original URL or returns an error response.
 * 
 * @example
 * // Request: GET /abc123
 * // Redirects to: https://example.com
 */
export const redirectToOriginalUrl = async (request: Request, response: Response): Promise<void> => {
  try {
    // Extract the short URL from the request parameters
    const { shortUrl } = request.params;

    // Validate the short URL parameter
    if (!shortUrl) {
      response.status(400).json({ message: 'Short URL parameter is required' });
      return;
    }

    // Retrieve the original URL associated with the short URL
    const originalUrl: string | null = getOriginalUrl(shortUrl);

    // If the original URL is not found, return a 404 error
    if (!originalUrl) {
      response.status(404).sendFile(path.join(__dirname, '..', '..', 'public', '404', 'index.html'));
      return;
    }

    // Normalize the original URL to ensure it has a protocol
    const normalizedUrl = originalUrl.startsWith('http://') || originalUrl.startsWith('https://')
      ? originalUrl
      : `https://${originalUrl}`;

    // Redirect the user to the original URL
    response.status(201).redirect(normalizedUrl);
  } catch (error) {
    console.error('Error in redirectToOriginalUrl:', error);
    response.status(500).json({ message: 'Internal server error' });
  }
};


/**
 * Controller to serve the static homepage.
 * 
 * This function sends the `index.html` file located in the `public` directory
 * as the response when the root route (`/`) is accessed.
 * 
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * 
 * @example
 * // When a user visits the root route ('/'), the homepage is served.
 * app.get('/', homeController);
 */
export const homeController = (request: Request, response: Response): void => {
  try {
    // Construct the absolute path to the index.html file
    const filePath = path.join(__dirname, '..', '..', 'public', 'home', 'index.html');

    // Send the file as the response
    response.sendFile(filePath);
  } catch (error) {
    // Handle errors (e.g., file not found)
    console.error('Error serving the homepage:', error);
    response.status(500).json({ message: 'Internal server error' });
  }
};