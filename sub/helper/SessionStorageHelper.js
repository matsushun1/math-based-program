
/**
 *
 * @param {String} key
 * @param {String} value
 */
export const setItemByKey = (key, value) => {
  sessionStorage.setItem(key, value)
}

/**
 *
 * @param {String} key
 */
export const getItemByKey = key => {
  return sessionStorage.getItem(key)
}
