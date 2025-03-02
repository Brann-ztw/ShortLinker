"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const urlRoutes_1 = require("./routes/urlRoutes");
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
const createApp = () => {
    const app = (0, express_1.default)();
    // Serve static files from the "public/home" directory
    app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public', 'home')));
    // Serve static files from the "public/404" directory
    app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public', '404')));
    // Use the URL router for handling URL-related routes
    app.use('/', urlRoutes_1.urlRouter);
    return app;
};
exports.createApp = createApp;
// Create and export the Express application
exports.app = (0, exports.createApp)();
