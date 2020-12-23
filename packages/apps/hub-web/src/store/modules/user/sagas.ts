import { all, call, takeLatest, Payload, put } from 'redux-saga/effects'

import { apiEEMAuth } from '@hub/api'
import { toast } from '@hub/common/utils'

import { ApiResponse } from 'apisauce'

import history from '~/services/history'

import { Actions, alterPasswordFailure, alterPasswordSuccess } from './actions'
import { UserAlterPass, UserAlterPassApi } from './types'

type AlterPasswordPayload = Payload<UserAlterPass>
export function* alterPassword({ payload }: AlterPasswordPayload): Generator {
  const response = yield call(() => {
    return apiEEMAuth.put('/api/v1/users/reset-password', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })

  const { data } = response as ApiResponse<UserAlterPassApi>

  if (data?.error) {
    toast.error(
      data?.errorMessage ||
        'Erro ao alterar a sua senha, verifique seus dados e tente novamente!'
    )

    return yield put(alterPasswordFailure())
  }
  toast.success('Senha Alterada com sucesso!')

  history.push('/login')

  return yield put(alterPasswordSuccess())
}

export default all([takeLatest(Actions.USER_PASSWORD_REQUEST, alterPassword)])
