const getStorage = (): string | null => {
  const storage = localStorage.getItem('@positivo:hub:auth:inject')

  return storage
}

function setStorage<T>(data: T): void {
  localStorage.setItem('@positivo:hub:auth:inject', JSON.stringify(data))
}

export { getStorage, setStorage }
