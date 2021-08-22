import { BigNumber } from 'bignumber.js'


/**
 * 値が小数かどうか判定する。falseであれば整数
 * @param {Number} num
 * @returns
 */
export const isDecimalNumber = (num) => (num != Math.floor(num)) // (num * 10) % 10 != 0 でも良い気がする

/**
 * 小数点以下の桁数を取得する
 * 整数の場合、0を返す
 * @param {*} num
 * @returns
 */
export const getDecimalDigits = (num) => {
  const numbers = String(num).split('.')
  return numbers[1] ? numbers[1].length : 0
}

/**
 * 小数を整数にするための10^Nを取得する
 * 引数が整数の場合、1を返す
 * @param {*} decimal
 */
export const getCarry = (decimal) => {
  return 10 ** getDecimalDigits(decimal)
}

export const isMinus = num =>  (Math.sign(num) == -1)

