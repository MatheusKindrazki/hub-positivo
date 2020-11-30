import { all, takeLatest, Payload, call, put } from 'redux-saga/effects'

import { apiAuthProduct } from '@hub/api'

import { ApiResponse } from 'apisauce'
import { toast } from 'react-toastify'

import { store } from '~/store'

import { loading } from '../global/actions'
import { Actions, authProductFailure, authProductSuccess } from './actions'
import { AuthRequest } from './types'

type AuthPayload = Payload<AuthRequest>
export function* authProduct({ payload }: AuthPayload): Generator {
  const auth = store.getState().auth
  const profile = store.getState().profile
  const user = store.getState().user

  if (!auth && !profile && !user) return

  yield put(loading(true))

  const authTheProduct = {
    product: payload.product,
    token: auth.token,
    logged_in: {
      school: {
        name: user.school?.label,
        id: user.school?.value
      },
      profile: profile.name
    },
    expires_in: auth.exp
  }

  const response = yield call(() => {
    return apiAuthProduct.post('api/TokenStorage', authTheProduct)
  })

  const { data, ok } = response as ApiResponse<object>

  if (!ok) {
    toast.error('Sinto mundo, algo deu errado :(')

    yield put(loading(false))

    return yield put(authProductFailure())
  }
  yield put(loading(false))

  window.location.assign(`${payload.url}/${data}`)

  return yield put(authProductSuccess())
}

export default all([takeLatest(Actions.AUTH_PRODUCT_REQUEST, authProduct)])
