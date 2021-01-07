import { all, takeLatest, Payload, call, put } from 'redux-saga/effects'

import { apiAuthProduct } from '@hub/api'
import { toast } from '@hub/common/utils'

import { ApiResponse } from 'apisauce'

import { EEMConnectPost } from '~/services/eemConnect'
import history from '~/services/history'
import { store } from '~/store'

import { loading } from '../global/actions'
import { setFrameURL } from '../products/actions'
import {
  Actions,
  authProductFailure,
  authProductSuccess,
  authProductRequest
} from './actions'
import { AuthRequest } from './types'

// tipos de renderização
// | 'iframe'
// | 'headerinject'
// | 'targetblank'
// | 'iframenoauth'
// | 'wordpress'

type AuthPayload = Payload<AuthRequest>

/*
  ?Triagem das soluções
*/
export function* productSorting({ payload }: AuthPayload): Generator {
  const auth = store.getState().auth
  const profile = store.getState().profile
  const user = store.getState().user

  if (!auth && !profile && !user) return

  const { tipoRenderizacao, url, product } = payload

  if (tipoRenderizacao === 'iframenoauth') {
    history.push(`/solucao/${product}`)

    return yield put(setFrameURL({ url, name: payload.name }))
  }

  if (tipoRenderizacao === 'targetblank') {
    window.open(url, '_blank')

    return yield put(authProductSuccess())
  }

  if (tipoRenderizacao === 'iframe') {
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
  const { level } = store.getState().levelEducation

  if (!auth && !profile && !user) return

  yield put(loading(true))

  const authTheProduct = {
    product: payload.product,
    token: auth.token,
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
    return apiAuthProduct.post('api/TokenStorage', authTheProduct)
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
  const auth = store.getState().auth
  const profile = store.getState().profile
  const user = store.getState().user

  if (!auth && !profile && !user) return

  yield put(loading(true))

  const response = yield call(() => {
    return EEMConnectPost({
      endpoint: 'connect/token',
      data: {
        access_token: auth?.token || '',
        school_id: user.school?.value,
        grant_type: 'change_school'
      }
    })
  })

  const { data, ok } = response as ApiResponse<{ access_token: string }>

  if (!ok) {
    toast.error('Sinto muito, algo deu errado :(')

    yield put(loading(false))

    return yield put(authProductFailure())
  }

  const newUrl = payload.url.replace(
    '{token}',
    data?.access_token || 'invalid-token'
  )

  yield put(setFrameURL({ url: newUrl, name: payload.name }))

  history.push(`/solucao/${payload.product}`)

  yield put(loading(false))

  return yield put(authProductSuccess())
}

export default all([
  takeLatest(Actions.AUTH_PRODUCT_REQUEST, productSorting),
  takeLatest(Actions.AUTH_PRODUCT_GUID_REQUEST, authProductGUID),
  takeLatest(Actions.AUTH_PRODUCT_EEM_REQUEST, authProductEEM)
])
