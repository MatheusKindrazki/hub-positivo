import { all, takeLatest, call, put, Payload } from 'redux-saga/effects'

import { apiMHUND, apiLivro } from '@hub/api'

import { store } from '~/store'
import { CardProduct, Product } from '~/store/modules/products/types'

import { Actions } from './actions'

interface CardType extends Product {
  type: 'apisae' | 'mhund'
}

interface IntegrationCardProps extends CardProduct {
  solucoes: CardType[]
}

type IntegrationPayload = Payload<IntegrationCardProps[]>
export function* mhundIntegration({ payload }: IntegrationPayload): Generator {
  const auth = store.getState().auth
  const { school } = store.getState().user
  const profile = store.getState().profile

  const authTheProduct = {
    product: 'mhund',
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
    return apiMHUND.post('checkuser', authTheProduct)
  })

  console.log(response)

  // const cardfilter = payload.filter(c =>
  //   c.solucoes.filter(solucao => {
  //     if (solucao.type === 'apisae') {
  //     }
  //   })
  // )

  return yield true
}

export default all([Actions.PRODUCT_SUCCESS, mhundIntegration])
