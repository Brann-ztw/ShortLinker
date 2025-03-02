import { readData } from '../models/urlModel';
import { generateShortUrl } from '../utils/generateShortUrl';

/**
 * Generates a unique short URL that does not already exist in the data file.
 * 
 * @returns {string} A unique short URL.
 * 
 * @example
 * // Returns a unique short URL like '12AzOU23T1456XyZ'
 * const uniqueUrl = generateUniqueShortUrl();
 */
export const generateUniqueShortUrl = (): string => {
  // Read existing data from the file
  const existingData: { [key: string]: string } = readData();

  // Get all existing short URLs
  const existingShortUrls: string[] = Object.keys(existingData);

  let uniqueUrl: string;

  // Generate a new short URL until a unique one is found
  do {
    uniqueUrl = generateShortUrl();
  } while (existingShortUrls.includes(uniqueUrl));

  return uniqueUrl;
};