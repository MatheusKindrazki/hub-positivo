import { Product } from '~/store/modules/products/types'
import { store } from '~/store'

import { toast } from '@hub/common/utils'
import api from '@hub/api'

interface CarBySlugProps {
  slug?: string
  perfil?: string
  nivelEnsino?: string
}

async function getCardBySlug(data: CarBySlugProps): Promise<Product | null> {
  if (!data.slug) return null
  const { token } = store.getState().auth

  api.setHeaders({
    Authorization: `Bearer ${token}`
  })

  const response = await api.get(
    'Solucao/SolucaoPorSlug',
    {
      slug: data.slug,
      perfil: data.perfil,
      nivelEnsino: data.nivelEnsino
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  const { ok, data: responseData } = response

  if (!ok) {
    toast.error('Sinto muito, você não tem acesso a esta solução.')

    return null
  }

  return (responseData as unknown) as Product
}

export { getCardBySlug }
