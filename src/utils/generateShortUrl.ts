import { getRandomIntInRange } from './getRandomIntInRange';
import { shuffleString } from './shuffleString';

// Map of months to their corresponding codes
const MONTH_MAP: { [key: number]: string } = {
  0: 'AzOU', 1: 'EF', 2: 'KLP',
  3: 'puÑ', 4: 'KkUq', 5: 'Znnklp',
  6: 'TXv', 7: 'Vmmx', 8: 'NaARb',
  9: 'ÑUpjk', 10: 'Jjr', 11: 'ZUlvO'
};

// Shuffle the alphabet string to use for random letter generation
const shuffledAlphabet: string = shuffleString('QWERTYUIOPASDFGHJKLÑZXCVBNMqwertyuiopasdfghjklñzxcvbnm');

/**
 * Generates a short URL based on the current date, time, and random characters.
 * 
 * @returns {string} A unique short URL string.
 * 
 * @example
 * // Returns a short URL like '12AzOU23T1456XyZ'
 * const shortUrl = generateShortUrl();
 */
export const generateShortUrl = (): string => {
  const currentDate: Date = new Date();
  const dateParts: string[] = currentDate.toString().split(' ');

  // Extract day, month, and year from the date
  const day: string = dateParts[2];
  const month: string = MONTH_MAP[currentDate.getMonth() as keyof typeof MONTH_MAP];
  const year: string = dateParts[3].slice(2, 4);

  // Extract and format the time (hours, minutes, seconds)
  const timeParts: string[] = dateParts[4].split(':');
  const formattedTime: string = timeParts.join('');

  // Generate a random string of letters
  const randomLength: number = getRandomIntInRange(4, 9);
  let randomLetters: string = '';

  while (randomLetters.length !== randomLength) {
    const randomIndex: number = getRandomIntInRange(0, shuffledAlphabet.length - 1);
    randomLetters += shuffledAlphabet[randomIndex];
  }

  // Combine all parts and shuffle the result to create the short URL
  const combinedString: string = day + month + year + formattedTime + randomLetters;
  return shuffleString(combinedString);
};