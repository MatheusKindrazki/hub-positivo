function clearAllStorage(): void {
  const storageName = '@hub-cleared'
  const clearedAll = localStorage.getItem(storageName)

  if (clearedAll) return

  localStorage.clear()
  localStorage.setItem(storageName, 'true')
}

export { clearAllStorage }
