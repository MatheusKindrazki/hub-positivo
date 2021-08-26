import { ApiResponse } from 'apisauce'

import { Product } from '~/store/modules/products/types'
import { store } from '~/store'

import { toast } from '@psdhub/common/utils'
import { getInstance } from '@psdhub/api'

interface CarBySlugProps {
  slug?: string
  perfil?: string
  nivelEnsino?: string
}

async function getCardBySlug(
  data: CarBySlugProps
): Promise<Product | undefined> {
  if (!data.slug) return
  const { reduced_token } = store.getState().auth

  const api = getInstance('default')

  api.setHeaders({
    Authorization: `Bearer ${reduced_token}`
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
        Authorization: `Bearer ${reduced_token}`
      }
    }
  )

  type RewriteProduct = Product & {
    mensagem: string
  }

  const { ok, data: responseData } = response as ApiResponse<RewriteProduct>

  if (!ok) {
    const message = responseData?.mensagem as string

    toast.error(message)

    return
  }

  return responseData
}

export { getCardBySlug }
