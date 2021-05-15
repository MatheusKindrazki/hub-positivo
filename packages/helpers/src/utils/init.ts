export const eventName = '@psdhub:solution:init'

const init = (): void => {
  const warnsStartup = new CustomEvent(eventName)

  document.dispatchEvent(warnsStartup)
}

export default init
