import { ApiResponse } from 'apisauce'

import { Product } from '~/store/modules/products/types'
import { store } from '~/store'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

interface CarBySlugProps {
  slug?: string
  perfil?: string
  nivelEnsino?: string
}

async function getCardBySlug(
  data: CarBySlugProps
): Promise<Product | undefined> {
  if (!data.slug) return
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

  const { ok, data: responseData } = response as ApiResponse<Product>

  if (!ok) {
    toast.error('Sinto muito, você não tem acesso a esta solução.')

    return
  }

  return responseData
}

export { getCardBySlug }