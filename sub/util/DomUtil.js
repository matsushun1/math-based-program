
/**
 * 親要素に合わせて要素の幅と高さを調整する
 * @param {*} tag
 */
export const fitToContainer = tag => {
  tag.style.width = '100%'
  tag.style.height = '100%'
}

export const getWidthHeight = tag => {
  return {width: tag.clientWidth,  height: tag.clientHeight}
}