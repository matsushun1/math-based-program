
import * as NumberUtil from '../../util/NumberUtil'

/**
 * y = ax + bの１次関数を表現
 * @param {Number} a
 * @param {Array} xRange
 * @param {Number} b
 * @returns {Array} y
 */
export const linearFunction = (a, xRange, b) => {
  const absNumbers = [...xRange, a, b].map(num => Math.abs(num)).filter(num => num != 0)
  const minX = Math.min(...absNumbers)

  if (!NumberUtil.isDecimalNumber(minX)) {
    return xRange.map(x => (a * x + b))
  }

  const carry = NumberUtil.getCarry(minX)
  const carriedNumberRange = xRange.map(num => num * carry)
  const carriedA = a * carry
  const carriedB = b * carry

  return carriedNumberRange.map(carriedX => {
    const ax = Number(carriedA * carriedX) / carry
    return (ax + carriedB) / carry
  })
}
