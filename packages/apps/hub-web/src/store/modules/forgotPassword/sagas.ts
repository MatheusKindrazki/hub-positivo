import { all, takeLatest, Payload, call, put } from 'redux-saga/effects'

import { apiEEMAuth } from '@hub/api'

import { ApiResponse } from 'apisauce'
import { toast } from 'react-toastify'

import history from '~/services/history'

import { AuthApi } from '../auth/types'
import { Actions, pwdTokenSuccess, pwdTokenFailure } from './actions'
import { PwdTokenRequest } from './types'

type PwdTokenPayload = Payload<PwdTokenRequest>

export function* pwdToken({ payload }: PwdTokenPayload): Generator {
  const response = yield call(() => {
    return apiEEMAuth.post('/api/v1/users/request-new-password', {
      userInfo: payload.userInfo,
      urlChangePassword: 'https://localhost/nova-senha'
    })
  })

  console.log(response)

  const { data, ok } = response as ApiResponse<AuthApi>

  if (!ok) {
    toast.error('Algo deu errado, verifique seus dados e tente novamente!')

    return yield put(pwdTokenFailure())
  }

  yield put(pwdTokenSuccess())

  history.push('/profile')
}

export default all([takeLatest(Actions.PWD_TOKEN_REQUEST, pwdToken)])
