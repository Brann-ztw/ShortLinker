"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomIntInRange = void 0;
/**
 * Generates a random integer between a specified minimum and maximum value (inclusive of min, exclusive of max).
 *
 * @param {number} min - The minimum value (inclusive) for the random number.
 * @param {number} max - The maximum value (exclusive) for the random number.
 * @returns {number} A random integer between `min` and `max`.
 * @throws {Error} Throws an error if `min` is greater than `max`.
 *
 * @example
 * // Returns a random integer between 5 and 10 (e.g., 7)
 * const randomNumber = getRandomIntInRange(5, 10);
 */
const getRandomIntInRange = (min, max) => {
    // Validate that min is not greater than max
    if (min > max) {
        throw new Error('The minimum value must be less than or equal to the maximum value.');
    }
    // Generate a random integer within the specified range
    return Math.floor(Math.random() * (max - min)) + min;
};
exports.getRandomIntInRange = getRandomIntInRange;
