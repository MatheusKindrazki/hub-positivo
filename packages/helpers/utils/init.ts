export const eventName = '@psdhub:solution:init'

const init = (): void => {
  const warnsStartup = new CustomEvent(eventName)

  document.dispatchEvent(warnsStartup)

  setTimeout(() => {
    document.dispatchEvent(warnsStartup)
  }, 500)
}

export default init
