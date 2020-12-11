interface FrameStorageProps {
  key: string
  url: string
}

function setFrame(data: FrameStorageProps): void {
  sessionStorage.setItem(data.key, data.url)
}

function getFrame(key: string): string | null {
  return sessionStorage.getItem(key)
}

function removeAllFrames(): void {
  sessionStorage.clear()
}

export { setFrame, getFrame, removeAllFrames }
