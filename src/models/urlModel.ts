import * as fs from 'fs';
import * as path from 'path';

// Define the path to the JSON file
const dataFilePath: string = path.join(__dirname, '..', 'data', 'urls.json');

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
export const readData = (): { [key: string]: string } => {
  if (!fs.existsSync(dataFilePath)) {
    throw new Error('The data file does not exist.');
  }

  const fileContent: string = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(fileContent);
};

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
export const writeData = (data: { [key: string]: string }): void => {
  if (!fs.existsSync(dataFilePath)) {
    throw new Error('The data file does not exist.');
  }

  // Read existing data
  const existingData: { [key: string]: string } = readData();

  // Merge new data into existing data
  const newKey: string = Object.keys(data)[0];
  const newValue: string = Object.values(data)[0];
  existingData[newKey] = newValue;

  // Write updated data back to the file
  fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));
};


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
export const getOriginalUrl = (shortUrl: string): string | null => {
  // Read the existing data from the storage
  const urlMappings: { [key: string]: string } = readData();

  // Convert the data into an array of key-value pairs
  const urlEntries: [string, string][] = Object.entries(urlMappings);

  // Find the entry that matches the short URL
  const matchedEntry = urlEntries.find(([key]) => key === shortUrl);

  // Return the original URL if found, otherwise return null
  return matchedEntry ? matchedEntry[1] : null;
};