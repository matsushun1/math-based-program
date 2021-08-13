
export const scaleNumber = (x, base = 10) => {
  const parsed = parseInt(x)
  if (isNaN(parsed)) return 0
  return parsed.toString(base)
}
