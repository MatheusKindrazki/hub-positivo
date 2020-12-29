/* eslint-disable @typescript-eslint/no-explicit-any */
import { all, call, takeLatest, Payload, put } from 'redux-saga/effects'

import api from '@hub/api'
import { toast } from '@hub/common/utils'
import capitalize from '@hub/common/utils/capitalize'

import { ApiResponse } from 'apisauce'
import { decode } from 'jsonwebtoken'

import { EEMConnectPost } from '~/services/eemConnect'
import history from '~/services/history'

import { productRequest } from '../products/actions'
import { Actions, signInFailure, signInSuccess, signOut } from './actions'
import { SignInRequest, AuthApi } from './types'

type SignInPayload = Payload<SignInRequest>

export function* signIn({ payload }: SignInPayload): Generator {
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

    return yield put(signInFailure())
  }

  api.setHeaders({
    Authorization: `Bearer ${data?.access_token || ''}`
  })

  const user = decode(data?.access_token || '') as any
  yield put(
    signInSuccess({
      token: data?.access_token || '',
      auth_time: user?.auth_time,
      exp: user?.exp,
      iat: user?.iat,
      user: {
        integration_id: user?.integration_id,
        id: user?.id,
        email: user?.email,
        name: user?.name ? capitalize(user?.name) : '',
        username: user?.username,
        schools: user?.schools
      }
    })
  )

  history.push('/profile')
}

type ExpiringRehydrate = Payload<{
  auth: { exp: number; iat: number; token: string; signed: boolean }
}>

export function* checkingExpiringToken({
  payload
}: ExpiringRehydrate): Generator {
  if (!payload) return
  if (!payload.auth.signed) {
    return yield put(signOut())
  }

  const { exp, token } = payload.auth

  if (!exp || exp === 0) {
    return
  }

  api.setHeaders({
    Authorization: `Bearer ${token || ''}`
  })

  const date = (new Date() as unknown) as number

  const now = Math.round(date / 1000)

  if (now >= exp) {
    toast.warn('Seu token expirou! Faça o login novamente para continuar!')

    yield put(signOut())

    history.push('/login')
  }

  return yield put(productRequest({}))
}

export default all([
  takeLatest(Actions.REHYDRATE, checkingExpiringToken),
  takeLatest(Actions.SIGN_IN_REQUEST, signIn)
])
