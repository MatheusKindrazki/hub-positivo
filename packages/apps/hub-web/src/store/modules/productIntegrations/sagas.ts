import { ApiResponse } from 'apisauce'

import { all, takeLatest, call, put } from 'redux-saga/effects'

import { CardProduct, Product } from '~/store/modules/products/types'
import { productIntegration } from '~/store/modules/products/actions'
import { store } from '~/store'

import { apiMHUND, apiLivro } from '@hub/api'

import arvoreLivros from './mock.json'
import { Actions } from './actions'
interface CardType extends Product {
  slug: string
}
interface IntegrationCardProps extends CardProduct {
  solucoes: CardType[]
}

export function* mhundArvoreIntegration(): Generator {
  const auth = store.getState().auth
  const { school } = store.getState().user
  const profile = store.getState().profile

  const products = store.getState().products

  const productData = products.data as IntegrationCardProps[]

  if (!productData?.length) return

  const authTheProduct = {
    product: 'gestao-escolar-mhund',
    token: auth.token,
    logged_in: {
      school: {
        name: school?.label,
        id: school?.value,
        class: null
      },
      profile: profile.guid,
      user_id: null
    },
    expire_in: auth.exp
  }

  const response = yield call(() => {
    return Promise.all([
      apiLivro.post('checkuser', authTheProduct),
      apiMHUND.post('checkuser', authTheProduct)
    ])
  })
  const [livro, mhund] = response as ApiResponse<{ redirects_to: string }>[]

  let cardFilter = productData.map(c => {
    return {
      ...c,
      solucoes: c.solucoes.map(solucao => {
        if (solucao.slug === 'gestao-escolar-mhund') {
          return {
            ...solucao,
            link: mhund.data?.redirects_to
          }
        }
        return solucao
      })
    }
  })

  if (livro.data?.redirects_to) {
    cardFilter = cardFilter.map(e => {
      if (e.nome === 'Conteúdo') {
        return {
          ...e,
          solucoes: [
            ...e.solucoes,
            {
              ...arvoreLivros,
              link: livro.data?.redirects_to
            }
          ]
        }
      }

      return e
    })
  }

  return yield put(productIntegration(cardFilter))
}

export default all([
  takeLatest(Actions.SAE_ARVORE_INTEGRATION, mhundArvoreIntegration)
])
