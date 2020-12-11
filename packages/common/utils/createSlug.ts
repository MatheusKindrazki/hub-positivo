function removeAcento(text: string): string {
  text = text.toLowerCase()
  text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
  text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e')
  text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i')
  text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
  text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u')
  text = text.replace(new RegExp('[Ç]', 'gi'), 'c')
  return text
}

function convertToSlug(Text: string): string {
  const prepare = removeAcento(Text)

  return prepare
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export default convertToSlug
