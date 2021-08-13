
export const scaleNumber = (x, base = 10) => {
  const parsed = parseInt(x)
  if (isNaN(parsed)) return 0
  return parsed.toString(base)
}

export const patternTest = (pattern, value) => {
  return pattern.test(value) || '適切な数値を入力してください'
}
