import { all, call, takeLatest, Payload, put } from 'redux-saga/effects'

import { toast } from '@hub/common/utils'
import capitalize from '@hub/common/utils/capitalize'

import { ApiResponse } from 'apisauce'
import { decode } from 'jsonwebtoken'

import { EEMConnectPost } from '~/services/eemConnect'
import history from '~/services/history'
import { store } from '~/store'
import { clearStrikes, storeStrike } from '~/utils/reCaptcha'

import { uniqueTokenPerSchoolEEM } from '../productIntegrations/actions'
import { productRequest } from '../products/actions'
import {
  Actions,
  signInFailure,
  refreshTokenRequest,
  signInSuccess,
  signOut,
  refreshTokenSuccess
} from './actions'
import { SignInRequest, AuthApi, RefreshTokenApi, RehydrateAuth } from './types'

import '~/middlewares/refreshToken'

type SignInPayload = Payload<SignInRequest>

export function* signIn({ payload }: SignInPayload): Generator {
  const redirectTo = payload.redirect

  delete payload.redirect

  const response = yield call(() => {
    return EEMConnectPost({
      endpoint: 'connect/token',
      data: {
        ...payload,
        grant_type: 'password'
      }
    })
  })

  const { data, ok } = response as ApiResponse<AuthApi>

  if (!ok) {
    toast.error('Algo deu errado, verifique seus dados e tente novamente!')

    storeStrike()

    return yield put(signInFailure())
  }

  const user = decode(data?.access_token as string) as any

  clearStrikes()

  yield put(
    signInSuccess({
      token: data?.access_token || '',
      refresh_token: data?.refresh_token || '',
      exp: user?.exp,
      user: {
        integration_id: user?.integration_id,
        id: user?.id,
        guid: user?.sub,
        email: user?.email,
        name: user?.name ? capitalize(user?.name) : '',
        username: user?.username,
        schools: user?.schools
      }
    })
  )

  if (redirectTo) {
    history.push(`/profile?redirect=${redirectTo}`)
    return
  }

  history.push('/profile')
}

/*
  Acionado no ciclo de vida primário da aplicação
  Buscando o token e chamando os produtos
*/
type ExpiringRehydrate = Payload<RehydrateAuth>

export function* checkingExpiringToken({
  payload
}: ExpiringRehydrate): Generator {
  if (!payload) return

  if (!payload.auth.signed) {
    return yield put(signOut())
  }

  const { exp } = payload.auth

  if (!exp || exp === 0) return

  const date = new Date().getTime()

  const now = Math.round(date / 1000)

  if (now >= exp) {
    yield put(refreshTokenRequest())
  }

  return yield put(productRequest({}))
}

/*
  Realiza do refresh do token e gera um novo
  token reduzido para transição entre as soluções
  do tipo EEM e Studos
*/
export function* refreshToken(): Generator {
  const { refresh_token } = store.getState().auth

  const response = yield call(() => {
    return EEMConnectPost({
      endpoint: 'connect/token',
      data: {
        refresh_token: refresh_token,
        grant_type: 'refresh_token'
      }
    })
  })

  const { data, ok } = response as ApiResponse<RefreshTokenApi>

  if (!ok) {
    toast.warn('Seu token expirou! Faça o login novamente para continuar!')

    yield put(signOut())

    history.push('/login')
  }

  yield put(uniqueTokenPerSchoolEEM({ callClasses: false }))

  const user = decode(data?.access_token as string) as { exp: number }

  return yield put(
    refreshTokenSuccess({
      refresh_token: data?.refresh_token as string,
      token: data?.access_token as string,
      exp: user?.exp
    })
  )
}

export default all([
  takeLatest(Actions.REHYDRATE, checkingExpiringToken),
  takeLatest(Actions.SIGN_IN_REQUEST, signIn),
  takeLatest(Actions.REFRESH_TOKEN_REQUEST, refreshToken)
])
