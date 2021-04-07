export default (name: string): void => {
  const title = `${name} - ${process.env.REACT_APP_HUB_TITLE || 'Hub'}`

  document.dispatchEvent(new CustomEvent('@psdhub:title', { detail: title }))

  document.title = title
}
