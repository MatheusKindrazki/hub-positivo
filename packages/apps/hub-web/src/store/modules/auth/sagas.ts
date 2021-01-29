import { decode } from 'jsonwebtoken'
import { ApiResponse } from 'apisauce'

import { all, call, takeLatest, Payload, put } from 'redux-saga/effects'

import { setSchool } from '~/store/modules/user/actions'
import {
  setProfile,
  profiles as setProfiles
} from '~/store/modules/profile/actions'
import { productRequest } from '~/store/modules/products/actions'
import { loading } from '~/store/modules/global/actions'
import { setSigned } from '~/store/modules/auth/actions'
import { store } from '~/store'

import capitalize from '@hub/common/utils/capitalize'
import { toast } from '@hub/common/utils'

import history from '~/services/history'
import { changeSchool, ApiChange } from '~/services/eemIntegration'
import { EEMConnectPost } from '~/services/eemConnect'

import { clearStrikes, storeStrike } from '~/utils/reCaptcha'

import {
  SignInRequest,
  AuthApi,
  RefreshTokenApi,
  RehydrateAuth,
  FirstAccessData
} from './types'
import {
  Actions,
  signInFailure,
  refreshTokenRequest,
  signInSuccess,
  signOut,
  refreshTokenSuccess,
  reducedTokenEEM
} from './actions'

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
      token: data?.access_token,
      refresh_token: data?.refresh_token,
      exp: user?.exp,
      user: {
        ...user,
        guid: user?.sub,
        username: user?.username,
        name: capitalize(user?.name as string)
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
  Configurações iniciais de acesso
*/
type FirstAccessPayload = Payload<FirstAccessData>
export function* prepareFirstAccess({
  payload
}: FirstAccessPayload): Generator {
  const { profiles, selected_profile, selected_school } = payload

  yield put(loading(true))

  yield put(setSchool(selected_school))

  const response = yield call(async () => {
    return await changeSchool()
  })

  const { access_token } = response as ApiChange

  yield put(reducedTokenEEM(access_token))

  yield put(
    setProfile({
      colorProfile: selected_profile.colorProfile,
      guid: selected_profile.id,
      name: selected_profile.name,
      profile: selected_profile.icon
    })
  )
  yield put(setProfiles(profiles))

  yield put(setSigned())

  return history.push('/')
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
    return yield put(refreshTokenRequest())
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

  const res = yield call(async () => {
    return await changeSchool()
  })

  const { access_token } = res as ApiChange

  yield put(reducedTokenEEM(access_token))

  const user = decode(data?.access_token as string) as { exp: number }

  yield put(
    refreshTokenSuccess({
      refresh_token: data?.refresh_token as string,
      token: data?.access_token as string,
      exp: user?.exp
    })
  )

  return yield put(productRequest({}))
}

export default all([
  takeLatest(Actions.SIGN_IN_REQUEST, signIn),
  takeLatest(Actions.REHYDRATE, checkingExpiringToken),
  takeLatest(Actions.FIRST_ACCESS, prepareFirstAccess),
  takeLatest(Actions.REFRESH_TOKEN_REQUEST, refreshToken)
])
