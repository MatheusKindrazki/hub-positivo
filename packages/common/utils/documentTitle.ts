export default (name: string): void => {
  document.title = `${name} - ${process.env.REACT_APP_HUB_TITLE || 'Hub'}`
}
