const getSlugFromURL = (pathname: string): string | undefined => {
  const slug = pathname.replace('/controle-de-acessos/editar/', '')
  slug.replace('/', '')
  return slug
}

export default getSlugFromURL
