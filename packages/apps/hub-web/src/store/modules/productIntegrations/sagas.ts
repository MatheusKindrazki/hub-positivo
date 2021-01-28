import { all, takeLatest, call, put, Payload } from 'redux-saga/effects'

import { apiMHUND, apiLivro } from '@hub/api'

import { ApiResponse } from 'apisauce'

import { EEMConnectPost } from '~/services/eemConnect'
import { store } from '~/store'
import { reducedTokenEEM } from '~/store/modules/auth/actions'
import { refreshEducation } from '~/store/modules/levelEducation/actions'
import { productIntegration } from '~/store/modules/products/actions'
import { CardProduct, Product } from '~/store/modules/products/types'

import { Actions, uniqueTokenPerSchoolEEM } from './actions'
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
      apiMHUND.post('checkuser', authTheProduct),
      apiLivro.post('checkuser', authTheProduct)
    ])
  })

  const [livro, mhund] = response as ApiResponse<{ redirects_to: string }>[]

  const cardFilter = productData.map(c => {
    return {
      ...c,
      solucoes: c.solucoes.map(solucao => {
        if (solucao.slug === 'gestao-escolar-mhund') {
          return {
            ...solucao,
            link: livro.data?.redirects_to || ''
          }
        }
        if (solucao.slug === 'arvore-livros') {
          return {
            ...solucao,
            link: mhund.data?.redirects_to || ''
          }
        }
        return solucao
      })
    }
  })

  return yield put(productIntegration(cardFilter))
}

type ReducedPayload = Payload<{ callClasses: boolean }>
export function* getReducedToken({ payload }: ReducedPayload): Generator {
  const auth = store.getState().auth
  const { school } = store.getState().user

  const response = yield call(() => {
    return EEMConnectPost({
      endpoint: 'connect/token',
      data: {
        access_token: auth?.token as string,
        school_id: school?.value,
        grant_type: 'change_school'
      }
    })
  })

  const { data, ok } = response as ApiResponse<{ access_token: string }>

  if (!ok) return yield put(uniqueTokenPerSchoolEEM({ callClasses: false }))

  yield put(reducedTokenEEM(data?.access_token as string))

  if (payload.callClasses) {
    yield put(refreshEducation())
  }
}

export default all([
  takeLatest(Actions.SAE_ARVORE_INTEGRATION, mhundArvoreIntegration),
  takeLatest(Actions.UNIQUE_TOKEN_PER_SCHOOL_EEM, getReducedToken)
])
