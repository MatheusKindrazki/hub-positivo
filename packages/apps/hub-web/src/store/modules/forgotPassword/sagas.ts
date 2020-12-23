import { all, takeLatest, Payload, call, put } from 'redux-saga/effects'

import { apiEEMAuth } from '@hub/api'

import { ApiResponse } from 'apisauce'
import { toast } from 'react-toastify'

import history from '~/services/history'

import { Actions, pwdTokenSuccess, pwdTokenFailure } from './actions'
import { PwdTokenApi } from './types'
import { PwdTokenRequest } from './types'

type PwdTokenPayload = Payload<PwdTokenRequest>

export function* pwdToken({ payload }: PwdTokenPayload): Generator {
  const response = yield call(() => {
    return apiEEMAuth.post('/api/v1/users/request-new-password', {
      userInfo: payload.userInfo,
      urlChangePassword: 'https://localhost/change-password'
    })
  })

  const { data, ok } = response as ApiResponse<PwdTokenApi>

  if (!ok || data?.error) {
    toast.error('Algo deu errado, verifique seus dados e tente novamente!')

    return yield put(pwdTokenFailure())
  }

  yield put(pwdTokenSuccess())

  history.push('/profile')
}

export default all([takeLatest(Actions.PWD_TOKEN_REQUEST, pwdToken)])
