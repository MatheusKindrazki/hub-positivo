import api from '@hub/api'

interface GetCardsProps {
  levelEducation?: string
  profile: string
}
export interface CardProduct {
  id: string
  nome: string
  cor: string
  solucoes: Product[]
}

export interface Product {
  id: string
  nome: string
  descricao: string
  arquivo: string
  notificacao?: string
  ativo: boolean
}

const getCards = async (data: GetCardsProps): Promise<CardProduct[]> => {
  const { profile, levelEducation = '' } = data

  let query: string

  if (levelEducation && profile === 'PROFESSOR') {
    query = `${profile}?NivelEnsino=${levelEducation}`
  } else {
    query = `${profile}`
  }

  const response = await api.get(`Categoria/Solucoes/Perfil/${query}`)

  if (!response.ok) {
    throw new Error('Erro ao buscar soluções')
  }

  return response.data as CardProduct[]
}
export { getCards }
