import { all, takeLatest, Payload, call, put } from 'redux-saga/effects'

import { ApiResponse } from 'apisauce'
import { toast } from 'react-toastify'

import history from '~/services/history'

import { Actions, pwdTokenSuccess, pwdTokenFailure } from './actions'
import { PwdTokenRequest } from './types'

type PwdTokenPayload = Payload<PwdTokenRequest>

export function* pwdToken({ payload }: PwdTokenPayload): Generator {
  const response = yield call(() => {
    // mockando post request a api para envio do token no email do usuario
    return { data: payload, ok: true }
  })

  const { data, ok } = response as ApiResponse<PwdTokenRequest>

  console.log('succesful request:', data)

  if (!ok) {
    toast.error('Algo deu errado, verifique seus dados e tente novamente!')

    return yield put(pwdTokenFailure())
  }

  yield put(pwdTokenSuccess())

  history.push('/profile')
}

export default all([takeLatest(Actions.PWD_TOKEN_REQUEST, pwdToken)])
