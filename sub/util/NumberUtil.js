
/**
 * 値が小数かどうか判定する。falseであれば整数
 * @param {Number} num
 * @returns
 */
export const isDecimalNumber = (num) => (num != Math.floor(num)) // (num * 10) % 10 != 0 でも良い気がする

export const getDecimalDigits = (num) => {
  const numbers = String(num).split('.')
  return numbers[1] ? numbers[1].length : 0
}

/**
 * 小数を桁上げして整数にする
 * @param  {...any} decimals
 * @returns {Array} {number: 桁上げされた数, carry: 桁上げ}
 */
export const decimalToNumberByCarrying = (...decimals) => {
  return decimals.map(decimal => {
    const carry = 10 ** getDecimalPointLength(decimal)
    return {number: num * carry, carry}
  })
}

