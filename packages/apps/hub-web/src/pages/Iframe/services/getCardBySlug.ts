import api from '@hub/api'
import { toast } from '@hub/common/utils'

import { Product } from '~/store/modules/products/types'
interface CarBySlugProps {
  slug?: string
  perfil?: string
  nivelEnsino?: string
}

async function getCardBySlug(data: CarBySlugProps): Promise<Product | null> {
  if (!data.slug) return null

  const response = await api.get('Solucao/SolucaoPorSlug', {
    slug: data.slug,
    perfil: data.perfil,
    nivelEnsino: data.nivelEnsino
  })

  const { ok, data: responseData } = response

  if (!ok) {
    toast.error('Sinto muito, você não tem acesso a esta solução.')

    return null
  }

  return (responseData as unknown) as Product
}

export { getCardBySlug }
