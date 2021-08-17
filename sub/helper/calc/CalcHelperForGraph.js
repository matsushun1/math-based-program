
import * as NumberUtil from '../../util/NumberUtil'

/**
 * y = ax + bの１次関数を表現
 * @param {Number} a
 * @param {Array} xRange
 * @param {Number} b
 * @returns {Array} y
 */
export const linearFunction = (a, xRange, b) => {
  const minX = Math.min(...xRange)
  if (!NumberUtil.isDecimalNumber(minX)) {
    return xRange.map(x => (a * x + b))
  }

  const carry = NumberUtil.getCarry(minX)
  const carriedNumberRange = xRange.map(num => num * carry)
  return carriedNumberRange.map(x => {
    console.log('a: ' + a + ', x: ' + x + ', carry: ' + carry)
    console.log('a * x / carry = ' + (a * x / carry))
    return (a * x / carry + b)
  })
}
