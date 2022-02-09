import { decode } from 'jsonwebtoken'

import { all, call, delay, takeLatest, Payload, put } from 'redux-saga/effects'

import { setSchool } from '~/store/modules/user/actions'
import {
  setProfile,
  profiles as setProfiles
} from '~/store/modules/profile/actions'
import { productRequest } from '~/store/modules/products/actions'
import {
  loading,
  enableRefreshTokenMiddleware
} from '~/store/modules/global/actions'
import { setSigned, signInRequestLoading } from '~/store/modules/auth/actions'
import { checkTermsRequest } from '~/store/modules/acceptTerms/actions'
import { store } from '~/store'

import capitalize from '@psdhub/common/utils/capitalize'
import { toast } from '@psdhub/common/utils'
import {
  ApiResponse,
  setAuthorization,
  statusCodeCondition,
  removeAuthorization
} from '@psdhub/api'

import sessionStarted from '~/services/mixpanel/sessionStarted'
import mixpanelIdentifyUser from '~/services/mixpanel/identifyUser'
import clearMixPanelSession from '~/services/mixpanel/clearAll'
import history from '~/services/history'
import { changeSchool, ApiChange } from '~/services/eemIntegration'
import { EEMConnectPost } from '~/services/eemConnect'

import { clearStrikes, storeStrike } from '~/utils/reCaptcha'
import { isTokenExpired } from '~/utils/isTokenExpired'

import refreshTokenMiddleware from '~/middlewares/refreshToken'

import {
  SignInRequest,
  AuthApi,
  RefreshTokenApi,
  RehydrateAuth,
  AccessData
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
import { notificationsRequest } from '../notifications/actions'
import { noBreakAccessEnable } from '../noBreakAccess/actions'

type SignInPayload = Payload<SignInRequest>

export function* signIn({ payload }: SignInPayload): Generator {
  const redirectTo = payload.redirect
  delete payload.redirect

  yield put(signInRequestLoading())

  const response = yield call(async () => {
    return EEMConnectPost({
      endpoint: 'connect/token',
      data: {
        ...payload,
        grant_type: 'password'
      }
    })
  })

  const { data, ok, status } = response as ApiResponse<AuthApi>

  if (statusCodeCondition.includes(status as number)) {
    yield put(noBreakAccessEnable({ user_login: payload.username }))

    history.push('/acesso-alternativo')

    return yield put(signInFailure())
  }

  if (!ok) {
    const genericMessage =
      'Usuário ou senha inválidos, verifique seus dados e tente novamente!'

    toast.error(data?.error_description || genericMessage)

    storeStrike()

    return yield put(signInFailure())
  }

  const user = decode(data?.access_token as string) as any

  // ? Identifica o usuário no mixpanel
  mixpanelIdentifyUser({ guid: user?.sub as string })

  // dispara evento de sessão iniciada
  sessionStarted({ tokenRefreshed: false })

  clearStrikes()
  yield put(
    signInSuccess({
      token: data?.access_token,
      refresh_token: data?.refresh_token,
      exp: user?.exp,
      info: {
        ...user,
        guid: user?.sub,
        username: user?.username,
        email_salas: '',
        name: capitalize(user?.name as string)
      }
    })
  )

  if (redirectTo) {
    history.push(`/perfil?redirect=${redirectTo}`)
    return
  }

  history.push('/perfil')
}

/**
 * Saga que cuida dos side effects da ação de logout do usuário, limpa sessão
 * do mixpanel, remove token de autorização dos headers padrão do cliente http e
 * redireciona o usuário para tela de login
 */
export function* prepareSignOut(): Generator {
  clearMixPanelSession()
  removeAuthorization('all')

  yield delay(500)
  history.push('/login')
}

/*
  !Evento disparado no login inicial do usuário
  !e também no processo de alteração de escola/perfil
*/
type PreparingAccessPayload = Payload<AccessData>
export function* prepareAccess({ payload }: PreparingAccessPayload): Generator {
  const { profiles, selected_profile, selected_school, redirect } = payload

  yield put(loading(true))

  yield call(async () => {
    return refreshTokenMiddleware()
  })

  yield put(setSchool(selected_school))

  const response = yield call(async () => {
    return changeSchool()
  })

  const { access_token } = response as ApiChange

  setAuthorization(access_token, 'all')

  const { info: user, school } = store.getState().user

  const { sub } = decode(access_token as string) as any

  if (sub && user?.guid !== sub) {
    const sc = school?.label as string
    toast.error(`Você não tem acesso a escola: ${sc}`)

    yield put(loading(false))

    return yield put(signOut())
  }

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

  if (Number(process.env.REACT_APP_FEATURE_NOTIFICATIONS)) {
    yield put(notificationsRequest())
  }

  yield put(enableRefreshTokenMiddleware(true))

  if (redirect) {
    yield put(setSigned())

    history.push(redirect)
  }

  yield put(checkTermsRequest())

  return yield put(loading(false))
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

  if (!payload.auth.signed && payload.auth.token) {
    return yield put(signOut())
  }

  const { exp, reduced_token } = payload.auth

  const { info: user } = payload.user

  if (exp === 0) return

  if (isTokenExpired(exp)) {
    return yield put(refreshTokenRequest())
  }

  yield put(loading(true))

  setAuthorization(reduced_token, 'all')

  yield put(reducedTokenEEM(reduced_token))

  yield put(enableRefreshTokenMiddleware(true))

  yield delay(1500)

  // ? Identifica o usuário no mixpanel
  mixpanelIdentifyUser({ guid: user.guid })

  yield put(checkTermsRequest())

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

    return history.push('/login')
  }

  const res = yield call(async () => {
    return changeSchool({
      token: data?.access_token
    })
  })

  const { access_token } = res as ApiChange

  yield put(reducedTokenEEM(access_token))

  setAuthorization(access_token, 'all')

  const user = decode(data?.access_token as string) as {
    exp: number
    sub: string
  }

  // ? Identifica o usuário no mixpanel
  mixpanelIdentifyUser({ guid: user.sub })

  yield put(
    refreshTokenSuccess({
      refresh_token: data?.refresh_token as string,
      token: data?.access_token as string,
      exp: user?.exp
    })
  )

  yield put(enableRefreshTokenMiddleware(true))

  yield delay(2000)

  return yield put(productRequest({}))
}

export default all([
  takeLatest(Actions.SIGN_IN_REQUEST, signIn),
  takeLatest(Actions.SIGN_OUT, prepareSignOut),
  takeLatest(Actions.REHYDRATE, checkingExpiringToken),
  takeLatest(Actions.FIRST_ACCESS, prepareAccess),
  takeLatest(Actions.REFRESH_TOKEN_REQUEST, refreshToken)
])
