interface FrameStorageProps {
  key: string
  url: string
  name: string
}

function setFrame(data: FrameStorageProps): void {
  const prepareString = JSON.stringify({ url: data.url, name: data.name })

  sessionStorage.setItem(data.key, prepareString)
}

function getFrame(key: string): Omit<FrameStorageProps, 'key'> | null {
  const getSession = sessionStorage.getItem(key)

  if (!getSession) return null

  return JSON.parse(getSession)
}

function removeAllFrames(): void {
  sessionStorage.clear()
}

export { setFrame, getFrame, removeAllFrames }
