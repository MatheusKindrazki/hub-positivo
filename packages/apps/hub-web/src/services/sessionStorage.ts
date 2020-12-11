interface FrameStorageProps {
  key: string
  url: string
}

function setFrame(data: FrameStorageProps): void {
  localStorage.setItem(data.key, data.url)
}

function getFrame(key: string): string | null {
  return localStorage.getItem(key)
}

function removeAllFrames(): void {
  localStorage.clear()
}

export { setFrame, getFrame, removeAllFrames }
