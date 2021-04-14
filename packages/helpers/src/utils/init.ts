export const eventName = '@psdhub:solution:init'

const init = (): void => {
  const warnsStartup = new CustomEvent(eventName)

  setTimeout(() => {
    document.dispatchEvent(warnsStartup)
  }, 1000)
}

export default init
