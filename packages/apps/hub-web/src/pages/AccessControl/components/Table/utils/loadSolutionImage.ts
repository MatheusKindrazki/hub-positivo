export const loadSolutionImage = (
  src: string,
  SuccessComponent: React.ReactElement,
  FailComponent: React.ReactElement
): React.ReactNode => {
  const image = new Image()

  image.src = src
  if (image.width === 0 || image.height === 0) {
    return FailComponent
  } else {
    return SuccessComponent
  }
}
