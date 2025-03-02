"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueShortUrl = void 0;
const urlModel_1 = require("../models/urlModel");
const generateShortUrl_1 = require("../utils/generateShortUrl");
/**
 * Generates a unique short URL that does not already exist in the data file.
 *
 * @returns {string} A unique short URL.
 *
 * @example
 * // Returns a unique short URL like '12AzOU23T1456XyZ'
 * const uniqueUrl = generateUniqueShortUrl();
 */
const generateUniqueShortUrl = () => {
    // Read existing data from the file
    const existingData = (0, urlModel_1.readData)();
    // Get all existing short URLs
    const existingShortUrls = Object.keys(existingData);
    let uniqueUrl;
    // Generate a new short URL until a unique one is found
    do {
        uniqueUrl = (0, generateShortUrl_1.generateShortUrl)();
    } while (existingShortUrls.includes(uniqueUrl));
    return uniqueUrl;
};
exports.generateUniqueShortUrl = generateUniqueShortUrl;
