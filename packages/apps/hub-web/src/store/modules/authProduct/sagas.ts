import { all, takeLatest, Payload, call, put } from 'redux-saga/effects'

import { apiAuthProduct, apiAuth } from '@hub/api'

import { ApiResponse } from 'apisauce'
import qs from 'qs'
import { toast } from 'react-toastify'

import history from '~/services/history'
import { store } from '~/store'

import { loading } from '../global/actions'
import { setFrameURL } from '../products/actions'
import { Actions, authProductFailure, authProductSuccess } from './actions'
import { StudosSolutions, EemSolutions } from './caseJwt'
import { AuthRequest } from './types'

type AuthPayload = Payload<AuthRequest>
export function* authProduct({ payload }: AuthPayload): Generator {
  const auth = store.getState().auth
  const profile = store.getState().profile
  const user = store.getState().user

  if (!auth && !profile && !user) return

  yield put(loading(true))

  if (
    StudosSolutions.includes(payload.product) ||
    EemSolutions.includes(payload.product)
  ) {
    const sendInfo = {
      ...payload,
      grant_type: 'change_school',
      client_id: process.env.REACT_APP_API_AUTH_CLIENT_ID,
      client_secret: process.env.REACT_APP_API_AUTH_SECRET_ID,
      scope: process.env.REACT_APP_API_AUTH_SCOPE,
      access_token: auth.token,
      school_id: user.school?.value
    }

    const response = yield call(() => {
      apiAuth.setHeaders({
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        accept: '*/*'
      })

      return apiAuth.post('connect/token', qs.stringify(sendInfo))
    })

    const { data: dataJWT, ok: okJWT } = response as ApiResponse<{
      access_token: string
    }>

    if (!okJWT) {
      toast.error('Sinto mundo, algo deu errado :(')

      yield put(loading(false))

      return yield put(authProductFailure())
    }

    const newUrl = payload.url.replace(
      '{token}',
      dataJWT?.access_token || 'invalid-token'
    )

    if (!EemSolutions.includes(payload.product)) {
      yield put(setFrameURL({ url: newUrl }))

      history.push(`/dashboard/${payload.product}`)
    } else {
      window.location.assign(`${payload.url}`)
    }

    yield put(loading(false))

    return yield put(authProductSuccess())
  }

  const authTheProduct = {
    product: payload.product,
    token: auth.token,
    logged_in: {
      school: {
        name: user.school?.label,
        id: user.school?.value,
        class: null
      },
      profile: profile.guid,
      user_id: null
    },
    expire_in: auth.exp
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

  if (payload?.integration_type === 'wordpress') {
    window.location.assign(`${payload.url}${data}`)
  } else {
    window.location.assign(`${payload.url}/${data}`)
  }
  return yield put(authProductSuccess())
}

export default all([takeLatest(Actions.AUTH_PRODUCT_REQUEST, authProduct)])
