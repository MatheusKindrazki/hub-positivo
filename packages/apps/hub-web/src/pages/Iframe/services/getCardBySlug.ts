import api from '@hub/api'
import { toast } from '@hub/common/utils'

import { Product } from '~/store/modules/products/types'

interface CarBySlugProps {
  slug?: string
}

async function getCardBySlug(data: CarBySlugProps): Promise<Product | null> {
  if (!data.slug) return null

  const response = await api.get('Solucao/SolucaoPorSlug', {
    slug: data.slug
  })

  const { ok, data: responseData } = response

  if (!ok) {
    toast.error('Erro ao carregar solução!')

    return null
  }

  return (responseData as unknown) as Product
}

export { getCardBySlug }
