import { ApiResponse } from 'apisauce'

import { all, call, delay, takeLatest, Payload, put } from 'redux-saga/effects'

import { store } from '~/store'

import { toast } from '@psdhub/common/utils'
import { apiEEMAuth } from '@psdhub/api'

import history from '~/services/history'

import { UserAlterPass, UserAlterPassPanel, UserAlterPassApi } from './types'
import {
  Actions,
  forgotPasswordFailure,
  forgotPasswordSuccess,
  alterPasswordFailure,
  alterPasswordSuccess
} from './actions'

// ?Endpoint esqueci minha senha
type AlterPasswordPayload = Payload<UserAlterPass>
export function* forgotPassword({ payload }: AlterPasswordPayload): Generator {
  const response = yield call(() => {
    return apiEEMAuth.put('/api/v1/users/reset-password', payload, {
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    })
  })

  const { data, ok } = response as ApiResponse<UserAlterPassApi>

  if (!ok) {
    toast.error('Erro ao alterar a sua senha, tente novamente mais tarde!')
    return yield put(forgotPasswordFailure())
  }

  if (data?.error) {
    toast.error(
      data?.errorMessage ||
        'Erro ao alterar a sua senha, verifique seus dados e tente novamente!'
    )

    return yield put(forgotPasswordFailure())
  }
  toast.success('Senha Alterada com sucesso!')

  yield delay(500)

  history.push('/login')

  return yield put(forgotPasswordSuccess())
}

// ?Endpoint para alterar senha via painel
type AlterPasswordPanelPayload = Payload<UserAlterPassPanel>
export function* alterPasswordPanel({
  payload
}: AlterPasswordPanelPayload): Generator {
  const { info: user } = store.getState().user
  const { token } = store.getState().auth

  const guid = user?.guid

  const response = yield call(() => {
    return apiEEMAuth.put(`/api/v1/users/${guid}/change-password`, payload, {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        Authorization: token
      }
    })
  })

  const { data, ok } = response as ApiResponse<UserAlterPassApi>

  if (!ok) {
    toast.error('Erro ao alterar a sua senha, tente novamente mais tarde!')
    return yield put(alterPasswordFailure())
  }

  if (data?.error) {
    toast.error(
      data?.errorMessage ||
        'Erro ao alterar a sua senha, verifique seus dados e tente novamente!'
    )

    return yield put(alterPasswordFailure())
  }
  toast.success('Senha Alterada com sucesso!')

  return yield put(alterPasswordSuccess())
}

export default all([
  takeLatest(Actions.USER_PASSWORD_REQUEST, forgotPassword),
  takeLatest(Actions.USER_PASSWORD_PANEL_REQUEST, alterPasswordPanel)
])
