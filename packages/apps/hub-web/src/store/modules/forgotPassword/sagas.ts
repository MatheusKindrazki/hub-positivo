import { ApiResponse } from 'apisauce'

import { all, takeLatest, Payload, call, put } from 'redux-saga/effects'

import { toast } from '@hub/common/utils'
import { apiEEMAuth } from '@hub/api'

import history from '~/services/history'

import { PwdTokenApi, ValidatePin, ValidatePinAPI } from './types'
import { PwdTokenRequest } from './types'
import {
  Actions,
  pwdTokenSuccess,
  pwdTokenFailure,
  validatePinFailure,
  validatePinSuccess
} from './actions'

type PwdTokenPayload = Payload<PwdTokenRequest>
export function* pwdToken({ payload }: PwdTokenPayload): Generator {
  const setURL = process.env.PUBLIC_URL || 'http://localhost:3000'

  const response = yield call(() => {
    return apiEEMAuth.post(
      '/api/v1/users/request-new-password',
      {
        userInfo: payload.userInfo,
        urlChangePassword: `${setURL}/#/change-password`
      },
      {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  })

  const { data, ok } = response as ApiResponse<PwdTokenApi>

  if (!ok) {
    history.push('/forgot-password/failure')

    return yield put(pwdTokenFailure())
  }

  if (data?.error) {
    toast.error(data.errorMessage || 'Erro ao verificar usuário')

    return yield put(pwdTokenFailure())
  }

  yield put(pwdTokenSuccess())

  toast.info(
    'Um link para recuperação de senha foi enviado para seu email ou celular'
  )

  setTimeout(() => history.push('/login'), 1000)
}
type ValidatePINtPayload = Payload<ValidatePin>

export function* validatePIN({ payload }: ValidatePINtPayload): Generator {
  const response = yield call(() => {
    return apiEEMAuth.post(
      '/api/v1/users/reset-password/check-pin',
      {
        pin: payload.pin
      },
      {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  })

  const { data, ok } = response as ApiResponse<ValidatePinAPI>

  if (!ok) {
    toast.error(
      'Ocorreu um erro ao validar seu pin, tente novamente mais tarde!'
    )

    return yield put(validatePinFailure())
  }

  if (!data?.content) {
    history.push('/expired-token')

    return yield put(validatePinSuccess(data?.content || false))
  }

  return yield put(validatePinSuccess(true))
}

export default all([
  takeLatest(Actions.PWD_TOKEN_REQUEST, pwdToken),
  takeLatest(Actions.VALIDATE_PIN_REQUEST, validatePIN)
])
