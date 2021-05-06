const getSlugFromURL = (pathname: string): string | undefined => {
  const slug = pathname.split('/controle-de-acessos/editar/').pop()
  return slug
}

export default getSlugFromURL
