
/**
 * key, valueを加工する関数をもとに加工したオブジェクトを取得する
 * @param {Object} obj
 * @param {Function} func
 * @returns
 */
export const mapObject = (obj, func) => {
  return Object.fromEntries(
    Object.entries(obj).map(func)
  )
}
