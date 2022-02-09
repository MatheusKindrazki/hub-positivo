import { ApiResponse } from 'apisauce'

import { all, takeLatest, Payload, call, put } from 'redux-saga/effects'

import { store } from '~/store'

import { toast, isMobile } from '@psdhub/common/utils'
import { getInstance } from '@psdhub/api'

import history from '~/services/history'

import { loadScripts } from '~/orchestrator'
import refreshTokenMiddleware from '~/middlewares/refreshToken'

import { AuthRequest, ReturnScripts } from './types'
import {
  Actions,
  authProductFailure,
  authProductSuccess,
  authProductRequest
} from './actions'
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
  const { auth, profile, user } = store.getState()

  if (!auth && !profile && !user) return

  const { exp, refresh_token, reduced_token } = auth

  yield call(async () => {
    return refreshTokenMiddleware({
      exp,
      refresh_token,
      reduced_token,
      dispatch: store.dispatch
    })
  })

  const { tipoRenderizacao, url, product } = payload

  if (tipoRenderizacao === 'iframenoauth') {
    history.push(`/solucao/${product}`)

    return yield put(
      authProductSuccess({
        mcf: false,
        productData: payload.url,
        productName: payload.name
      })
    )
  }

  if (tipoRenderizacao === 'deeplink') {
    return history.push(url)
  }

  if (tipoRenderizacao === 'targetblank') {
    return window.open(url, '_blank')
  }

  if (tipoRenderizacao === 'microfrontend') {
    return yield put(authProductRequest(payload, 'MICRO_FRONTEND_REQUEST'))
  }

  if (EEMIframeVerify.includes(tipoRenderizacao as string)) {
    return yield put(authProductRequest(payload, 'AUTH_PRODUCT_EEM_REQUEST'))
  }

  return yield put(authProductRequest(payload, 'AUTH_PRODUCT_GUID_REQUEST'))
}

/*
  ! Micro-frontend Auth
*/
export function* authMcf({ payload }: AuthPayload): Generator {
  yield put(loading(true))

  try {
    const resMcf = yield call(async () => {
      return loadScripts({ manifestUrl: payload.url })
    })

    yield put(
      authProductSuccess({
        mcf: true,
        productData: resMcf as ReturnScripts,
        productName: payload.name
      })
    )

    history.push(`/solucao/${payload.product}/${payload.subpath || ''}`)
  } catch (error) {
    history.push('/')

    toast.warn(
      'Estamos com dificuldades para carregar a solução, tente novamente em breve!'
    )
  }

  return yield put(loading(false))
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
      user_id: user.info?.integration_id || user.info?.id
    },
    expire_in: auth.exp
  }

  const api = getInstance('token')

  const response = yield call(() => {
    return api.post('api/TokenStorage', authTheProduct)
  })

  const { data, ok } = response as ApiResponse<object>

  if (!ok) {
    toast.error('Sinto muito, algo deu errado :(')

    yield put(loading(false))

    return yield put(authProductFailure())
  }

  yield put(loading(false))

  const subpath = payload.subpath !== undefined ? payload.subpath : ''

  let urlAuth = ''
  if (payload.url.includes('{guid}')) {
    const guid = data as unknown as string

    urlAuth = payload.url.replace('{guid}', `${guid}/${subpath}`)
  } else {
    urlAuth = `${payload.url}/${data}/${subpath}`
  }

  if (payload.tipoRenderizacao === 'wordpress') {
    const guid = data as unknown as string

    urlAuth = payload.url.replace('{token}', guid)

    window.open(urlAuth, '_blank')

    return yield put(
      authProductSuccess({
        mcf: false,
        productData: '',
        productName: ''
      })
    )
  }

  history.push(`/solucao/${payload.product}/${subpath}`)

  return yield put(
    authProductSuccess({
      mcf: false,
      productData: urlAuth,
      productName: payload.name
    })
  )
}

/*
  ! Autenticação utilizando JWT EEM
*/
export function* authProductEEM({ payload }: AuthPayload): Generator {
  const { reduced_token } = store.getState().auth

  yield put(loading(true))

  const newUrl = payload.url.replace('{token}', reduced_token as string)

  if (payload.tipoRenderizacao === 'iframeblank' && isMobile.iOS()) {
    window.open(newUrl, '_blank')
  } else {
    yield put(
      authProductSuccess({
        mcf: false,
        productData: newUrl,
        productName: payload.name
      })
    )
    history.push(`/solucao/${payload.product}`)
  }

  yield put(loading(false))
}

export default all([
  takeLatest(Actions.AUTH_PRODUCT_REQUEST, productSorting),
  takeLatest(Actions.AUTH_PRODUCT_GUID_REQUEST, authProductGUID),
  takeLatest(Actions.AUTH_PRODUCT_EEM_REQUEST, authProductEEM),
  takeLatest(Actions.MICRO_FRONTEND_REQUEST, authMcf)
])
