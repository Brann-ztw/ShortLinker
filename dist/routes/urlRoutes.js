"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRouter = void 0;
const express_1 = require("express");
const urlController_1 = require("../controllers/urlController");
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
exports.urlRouter = (0, express_1.Router)();
// Route to serve the homepage
exports.urlRouter.get('/', urlController_1.homeController);
// Route to shorten a URL
exports.urlRouter.post('/shorten', urlController_1.shortenUrlController);
// Route to redirect to the original URL    
exports.urlRouter.get('/:shortUrl', urlController_1.redirectToOriginalUrl);
