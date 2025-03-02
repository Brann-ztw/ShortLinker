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
exports.getOriginalUrl = exports.writeData = exports.readData = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Define the path to the JSON file
const dataFilePath = path.join(__dirname, '..', '..', 'data', 'urls.json');
/**
 * Reads and parses the JSON data from the file.
 *
 * @returns {Object} The parsed JSON data as an object.
 * @throws {Error} Throws an error if the file does not exist.
 *
 * @example
 * // Returns the content of urls.json as an object
 * const data = readData();
 */
const readData = () => {
    if (!fs.existsSync(dataFilePath)) {
        throw new Error('The data file does not exist.');
    }
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
};
exports.readData = readData;
/**
 * Writes new data to the JSON file, merging it with existing data.
 *
 * @param {Object} data - The new data to add, as a key-value pair.
 * @throws {Error} Throws an error if the file does not exist.
 *
 * @example
 * // Adds a new key-value pair to the data and saves it
 * writeData({ 'shortUrl': 'https://example.com' });
 */
const writeData = (data) => {
    if (!fs.existsSync(dataFilePath)) {
        throw new Error('The data file does not exist.');
    }
    // Read existing data
    const existingData = (0, exports.readData)();
    // Merge new data into existing data
    const newKey = Object.keys(data)[0];
    const newValue = Object.values(data)[0];
    existingData[newKey] = newValue;
    // Write updated data back to the file
    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));
};
exports.writeData = writeData;
/**
 * Retrieves the original URL associated with a given short URL.
 *
 * @param {string} shortUrl - The short URL to look up.
 * @returns {string | null} The original URL if found, or `null` if the short URL does not exist.
 *
 * @example
 * // Returns the original URL or null if not found
 * const originalUrl = getOriginalUrl('abc123');
 */
const getOriginalUrl = (shortUrl) => {
    // Read the existing data from the storage
    const urlMappings = (0, exports.readData)();
    // Convert the data into an array of key-value pairs
    const urlEntries = Object.entries(urlMappings);
    // Find the entry that matches the short URL
    const matchedEntry = urlEntries.find(([key]) => key === shortUrl);
    // Return the original URL if found, otherwise return null
    return matchedEntry ? matchedEntry[1] : null;
};
exports.getOriginalUrl = getOriginalUrl;
