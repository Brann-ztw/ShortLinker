"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeController = exports.redirectToOriginalUrl = exports.shortenUrlController = void 0;
const urlService_1 = require("../services/urlService");
const urlModel_1 = require("../models/urlModel");
const validator_1 = require("validator");
const path = __importStar(require("path"));
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
const shortenUrlController = async (request, response) => {
    try {
        // Extract the URL from the query parameters
        const { url: originalUrl } = request.query;
        // Validate the URL parameter
        if (!originalUrl) {
            response.status(400).json({ message: 'URL parameter is required' });
            return;
        }
        // Validate the URL
        if (!(0, validator_1.isURL)(originalUrl)) {
            response.status(400).json({ message: 'Invalid URL' });
            return;
        }
        // Generate a unique short URL path
        const shortUrlPath = (0, urlService_1.generateUniqueShortUrl)();
        // Save the short URL and original URL to the data file
        await (0, urlModel_1.writeData)({ [shortUrlPath]: originalUrl });
        // Get the host dynamically from the request object
        const host = request.get('host'); // Returns something like 'tuaplicacion.vercel.app'
        const protocol = request.protocol; // Returns 'http' or 'https'
        const baseHost = `${protocol}://${host}`; // Constructs the base URL (e.g., 'https://tuaplicacion.vercel.app')
        // Construct the full shortened URL using the dynamic host
        const shortenedUrl = `${baseHost}/${shortUrlPath}`;
        // Return the full shortened URL in the response
        response.status(200).json({ shortenedUrl });
    }
    catch (error) {
        console.error('Error in shortenUrlController:', error);
        response.status(500).json({ message: 'Internal server error' });
    }
};
exports.shortenUrlController = shortenUrlController;
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
const redirectToOriginalUrl = async (request, response) => {
    try {
        // Extract the short URL from the request parameters
        const { shortUrl } = request.params;
        // Validate the short URL parameter
        if (!shortUrl) {
            response.status(400).json({ message: 'Short URL parameter is required' });
            return;
        }
        // Retrieve the original URL associated with the short URL
        const originalUrl = (0, urlModel_1.getOriginalUrl)(shortUrl);
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
    }
    catch (error) {
        console.error('Error in redirectToOriginalUrl:', error);
        response.status(500).json({ message: 'Internal server error' });
    }
};
exports.redirectToOriginalUrl = redirectToOriginalUrl;
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
const homeController = (request, response) => {
    try {
        // Construct the absolute path to the index.html file
        const filePath = path.join(__dirname, '..', '..', 'public', 'home', 'index.html');
        // Send the file as the response
        response.sendFile(filePath);
    }
    catch (error) {
        // Handle errors (e.g., file not found)
        console.error('Error serving the homepage:', error);
        response.status(500).json({ message: 'Internal server error' });
    }
};
exports.homeController = homeController;
