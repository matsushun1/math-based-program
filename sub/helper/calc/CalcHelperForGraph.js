
/**
 * y = ax + bの１次関数を表現
 * @param {Number} a
 * @param {Array} xRange
 * @param {Number} b
 * @returns {Array} y
 */
export const linearFunction = (a, xRange, b) => {
  return xRange.map(x => (a * x + b));
}
