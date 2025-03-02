"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleString = void 0;
const getRandomIntInRange_1 = require("./getRandomIntInRange");
/**
 * Shuffles the characters of a given string using the Fisher-Yates algorithm.
 *
 * @param {string} str - The input string to be shuffled.
 * @returns {string} A new string with the characters shuffled randomly.
 *
 * @example
 * // Returns a shuffled version of the input string (e.g., 'olhel')
 * const shuffledString = shuffleString('hello');
 */
const shuffleString = (str) => {
    // Convert the string into an array of characters
    const characters = [...str];
    // Fisher-Yates (Knuth) Shuffle Algorithm
    for (let i = characters.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i (inclusive)
        const randomIndex = (0, getRandomIntInRange_1.getRandomIntInRange)(0, i + 1);
        // Swap the current character with the randomly selected one
        [characters[i], characters[randomIndex]] = [characters[randomIndex], characters[i]];
    }
    // Convert the array of characters back into a string
    return characters.join('');
};
exports.shuffleString = shuffleString;
