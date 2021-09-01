
import * as NumberUtil from '../util/NumberUtil'

/**
 * start ~ end範囲のNumber配列を取得する
 * start, end, stepが小数の場合桁上げを行い、計算完了後に桁下げを施す。マイナス値にも対応
 * @param {*} start
 * @param {*} end
 * @param {*} step デフォルト1
 * @returns
 */
export const getNumberRange = (start, end, step = 1) => {
  const isStepMinus = NumberUtil.isMinus(step)
  if ((start < end && isStepMinus) || (end < start && !isStepMinus)) return []

  const carry = NumberUtil.getCarry(Math.min(start, end, step))
  const [startNum, endNum, stepNum] = [start, end, step].map(num => carry * num)

  const ret = []
  for (let i = startNum; i <= endNum; i += stepNum) {
    ret.push(i / carry)
  }

  return ret
}
