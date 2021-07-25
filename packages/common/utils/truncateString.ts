// Truncate a string to a certain length if necessary
export function truncateString(str: string, limit: number): string {
  if (str.length <= limit) {
    return str
  }

  const result = str.substr(0, limit) + '...'
  return result
}
