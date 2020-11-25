import { all, call, takeLatest, Payload, put } from 'redux-saga/effects'

import { apiAuth } from '@hub/api'

import { ApiResponse } from 'apisauce'
import { decode } from 'jsonwebtoken'
import qs from 'qs'
import { toast } from 'react-toastify'

import history from '~/services/history'

import { Actions, signInFailure, signInSuccess, signOut } from './actions'
import { SignInRequest, AuthApi } from './types'

type SignInPayload = Payload<SignInRequest>

export function* signIn({ payload }: SignInPayload): Generator {
  const sendInfo = {
    ...payload,
    grant_type: process.env.REACT_APP_API_AUTH_TYPE,
    client_id: process.env.REACT_APP_API_AUTH_CLIENT_ID,
    client_secret: process.env.REACT_APP_API_AUTH_SECRET_ID,
    scope: process.env.REACT_APP_API_AUTH_SCOPE
  }

  const response = yield call(() => {
    apiAuth.setHeaders({
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      accept: '*/*'
    })

    return apiAuth.post('connect/token', qs.stringify(sendInfo))
  })

  const { data, ok } = response as ApiResponse<AuthApi>

  if (!ok) {
    toast.error('Algo deu errado, verifique seus dados e tente novamente!')

    return yield put(signInFailure())
  }

  const user = decode(data?.access_token || '') as any

  yield put(
    signInSuccess({
      token: data?.access_token || '',
      auth_time: user?.auth_time,
      exp: user?.exp,
      iat: user?.iat,
      user: {
        email: user?.email,
        name: user?.name,
        username: user?.username,
        schools: user?.schools
      }
    })
  )

  return history.push('/profile')
}

type ExpiringRehydrate = Payload<{
  auth: { exp: number; iat: number; token: string }
}>

export function* checkingExpiringToken({
  payload
}: ExpiringRehydrate): Generator {
  if (!payload) return

  const { exp } = payload.auth

  const date = (new Date() as unknown) as number

  const now = Math.round(date / 1000)

  if (now >= exp) {
    toast.warn('Seu token expirou! Faça o login novamente para continuar!')

    yield put(signOut())

    history.push('/login')
  }

  return yield true
}

export default all([
  takeLatest(Actions.REHYDRATE, checkingExpiringToken),
  takeLatest(Actions.SIGN_IN_REQUEST, signIn)
])
