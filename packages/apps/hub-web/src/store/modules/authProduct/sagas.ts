import { ApiResponse } from 'apisauce'

import { all, takeLatest, Payload, call, put } from 'redux-saga/effects'

import { store } from '~/store'

import { toast } from '@hub/common/utils'
import { apiAuthProduct } from '@hub/api'

import history from '~/services/history'

import refreshTokenMiddleware from '~/middlewares/refreshToken'

import { AuthRequest } from './types'
import {
  Actions,
  authProductFailure,
  authProductSuccess,
  authProductRequest
} from './actions'
import { setFrameURL } from '../products/actions'
import { loading } from '../global/actions'

// ! tipos de renderização
// | 'iframe'
// | 'headerinject'
// | 'targetblank'
// | 'iframenoauth'
// | 'wordpress'

type AuthPayload = Payload<AuthRequest>

const EEMIframeVerify = ['iframe', 'iframeblank']

/*
  ?Triagem das soluções
*/
export function* productSorting({ payload }: AuthPayload): Generator {
  const auth = store.getState().auth
  const profile = store.getState().profile
  const user = store.getState().user

  if (!auth && !profile && !user) return

  yield call(async () => {
    return await refreshTokenMiddleware()
  })

  const { tipoRenderizacao, url, product } = payload

  if (tipoRenderizacao === 'iframenoauth') {
    history.push(`/solucao/${product}`)

    return yield put(setFrameURL({ url, name: payload.name }))
  }

  if (tipoRenderizacao === 'targetblank') {
    window.open(url, '_blank')

    return yield put(authProductSuccess())
  }

  if (EEMIframeVerify.includes(tipoRenderizacao as string)) {
    return yield put(authProductRequest(payload, 'AUTH_PRODUCT_EEM_REQUEST'))
  }

  return yield put(authProductRequest(payload, 'AUTH_PRODUCT_GUID_REQUEST'))
}

/*
  ! Autenticação utilizando API GUID
*/
export function* authProductGUID({ payload }: AuthPayload): Generator {
  const auth = store.getState().auth
  const profile = store.getState().profile
  const user = store.getState().user
  const { level } = store.getState().educationalStage

  if (!auth && !profile && !user) return

  yield put(loading(true))

  const authTheProduct = {
    product: payload.product,
    token: auth.token,
    reduced_token: auth.reduced_token,
    logged_in: {
      school: {
        name: user.school?.label,
        id: user.school?.value,
        class: level
      },
      profile: profile.guid,
      user_id: user.user?.integration_id || user.user?.id
    },
    expire_in: auth.exp
  }

  const response = yield call(() => {
    return apiAuthProduct.post('api/TokenStorage', authTheProduct, {
      headers: {
        Authorization: `Bearer ${auth.reduced_token}`
      }
    })
  })

  const { data, ok } = response as ApiResponse<object>

  if (!ok) {
    toast.error('Sinto muito, algo deu errado :(')

    yield put(loading(false))

    return yield put(authProductFailure())
  }
  yield put(loading(false))

  const subpath = payload.subpath !== undefined ? payload.subpath : ''

  history.push(`/solucao/${payload.product}/${subpath}`)
  yield put(
    setFrameURL({
      url: `${payload.url}/${data}/${subpath}`,
      name: payload.name
    })
  )

  return yield put(authProductSuccess())
}

/*
  ! Autenticação utilizando JWT EEM
*/
export function* authProductEEM({ payload }: AuthPayload): Generator {
  const { reduced_token } = store.getState().auth

  yield put(loading(true))

  const newUrl = payload.url.replace('{token}', reduced_token as string)

  if (payload.tipoRenderizacao === 'iframeblank') {
    window.open(newUrl, '_blank')
  } else {
    yield put(setFrameURL({ url: newUrl, name: payload.name }))

    history.push(`/solucao/${payload.product}`)
  }

  yield put(loading(false))

  return yield put(authProductSuccess())
}

export default all([
  takeLatest(Actions.AUTH_PRODUCT_REQUEST, productSorting),
  takeLatest(Actions.AUTH_PRODUCT_GUID_REQUEST, authProductGUID),
  takeLatest(Actions.AUTH_PRODUCT_EEM_REQUEST, authProductEEM)
])
