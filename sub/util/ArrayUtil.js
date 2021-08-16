
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
  const stepIsMinus = (Math.sign(step) == -1)
  if ((start < end && stepIsMinus) || (end < start && !stepIsMinus)) return []

  const decimalDigits = [start, end].map(num => NumberUtil.getDecimalDigits(num))
  const carry = Math.max(...decimalDigits) || 1
  const [startNum, endNum] = [start, end].map(num => num ** carry)

  const stepNum = step ** (NumberUtil.getDecimalDigits(step) || 1)
  const ret = []
  for (let i = startNum; i <= endNum; i += stepNum) {
    ret.push(i / carry)
  }
  console.log(ret)
  return ret
}
