/**
 * Parse string with key:value pairs into an object
 * @param {string|null|undefined} str - Input string with multiline separator where each line contains key:value pairs
 * @returns {Object} Object with parsed key-value pairs
 *
 * @example
 * // Input string with multiline separator
 * const input = `abc:123
 * cde:000
 * jjj:lala-asd`;
 *
 * const result = parseToObject(input);
 * // Output: { abc: "123", cde: "000", jjj: "lala-asd" }
 *
 * @example
 * // Null input handling
 * const result = parseToObject(null);
 * // Output: {}
 *
 * @example
 * // Empty string input
 * const result = parseToObject("");
 * // Output: {}
 */
function parseToObject(str) {
  // Check if input is null or undefined
  if (str == null) {
    return {};
  }

  const obj = {};
  const lines = str.split("\n");

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine) {
      const [key, value] = trimmedLine.split(":");
      if (key && value !== undefined) {
        obj[key.trim()] = value.trim();
      }
    }
  });

  return obj;
}

// Your input string
const input = `abc:123
cde:000
jjj:lala-asd`;

// Parse the string into an object
const obj = parseToObject(input);

// Test with null input
const nullObj = parseToObject(null);
console.log("Null input result:", nullObj); // Output: {}

// Now you can access values by their keys
console.log(obj.abc); // Output: "123"
console.log(obj.cde); // Output: "000"
console.log(obj.jjj); // Output: "lala-asd"

// You can also use bracket notation
console.log(obj["abc"]); // Output: "123"

// Export the function for reuse
module.exports = { parseToObject };
