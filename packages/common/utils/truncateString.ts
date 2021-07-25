// Truncate a string to a certain length if necessary, but always ensuring
// that it does not get truncated to an ellipsis, and always with a ... in the middle.
export function truncateString(str: string, limit: number): string {
  if (str.length <= limit) {
    return str
  }

  const mid = (limit - 3) / 2
  const end = str.length - mid
  const result = str.substr(0, mid) + '...' + str.substr(end)
  return result
}
