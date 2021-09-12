
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

/**
 * 指定桁数で切り捨てする
 * @param {*} value
 * @param {*} base
 * @returns
 */
export const orgFloor = (value, base) => Math.floor(value * (10 ** base)) / (10 ** base)

export const orgRound = (value, base) => Math.round(value * (10 ** base)) / (10 ** base)

export const orgCeil = (value, base) => Math.ceil(value * (10 ** base)) / (10 ** base)

export const orgTrunc = (value, base) => Math.trunc(value * (10 ** base)) / (10 ** base)

/**
 * 角度（度数法） x 弧度法
 * 度数法の場合、1周を360とみなした上でどの程度の割合かを算出したもの。
 * 度数法を弧度法に変換するには、1周を2πと見なし、2πの中での度数/360の割合を求める => 2π * 割合
 * ex) 90°: 2π * 90 * 1/360 = 1/2π[rad]
 * π * 1/180に置き換えられる
 * @param {*} degree
 * @returns
 */
export const radian = degree => degree * (Math.PI / 180)


