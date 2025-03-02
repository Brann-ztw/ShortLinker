"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShortUrl = void 0;
const getRandomIntInRange_1 = require("./getRandomIntInRange");
const shuffleString_1 = require("./shuffleString");
// Map of months to their corresponding codes
const MONTH_MAP = {
    0: 'AzOU', 1: 'EF', 2: 'KLP',
    3: 'puÑ', 4: 'KkUq', 5: 'Znnklp',
    6: 'TXv', 7: 'Vmmx', 8: 'NaARb',
    9: 'ÑUpjk', 10: 'Jjr', 11: 'ZUlvO'
};
// Shuffle the alphabet string to use for random letter generation
const shuffledAlphabet = (0, shuffleString_1.shuffleString)('QWERTYUIOPASDFGHJKLÑZXCVBNMqwertyuiopasdfghjklñzxcvbnm');
/**
 * Generates a short URL based on the current date, time, and random characters.
 *
 * @returns {string} A unique short URL string.
 *
 * @example
 * // Returns a short URL like '12AzOU23T1456XyZ'
 * const shortUrl = generateShortUrl();
 */
const generateShortUrl = () => {
    const currentDate = new Date();
    const dateParts = currentDate.toString().split(' ');
    // Extract day, month, and year from the date
    const day = dateParts[2];
    const month = MONTH_MAP[currentDate.getMonth()];
    const year = dateParts[3].slice(2, 4);
    // Extract and format the time (hours, minutes, seconds)
    const timeParts = dateParts[4].split(':');
    const formattedTime = timeParts.join('');
    // Generate a random string of letters
    const randomLength = (0, getRandomIntInRange_1.getRandomIntInRange)(4, 9);
    let randomLetters = '';
    while (randomLetters.length !== randomLength) {
        const randomIndex = (0, getRandomIntInRange_1.getRandomIntInRange)(0, shuffledAlphabet.length - 1);
        randomLetters += shuffledAlphabet[randomIndex];
    }
    // Combine all parts and shuffle the result to create the short URL
    const combinedString = day + month + year + formattedTime + randomLetters;
    return (0, shuffleString_1.shuffleString)(combinedString);
};
exports.generateShortUrl = generateShortUrl;
