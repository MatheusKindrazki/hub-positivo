import { ApiResponse } from 'apisauce'

import { call, takeLatest, all, Payload, put } from 'redux-saga/effects'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import { UpdateSolutionData, SolutionUpdateResponse } from './types'
import {
  Actions,
  solutionUpdateSuccess,
  solutionUpdateFailure
} from './actions'

type UpdateSolutionPayload = Payload<UpdateSolutionData>

export function* updateSolution({ payload }: UpdateSolutionPayload): Generator {
  const response = yield call(async () => {
    return api.put('/Solucao', {
      ...payload
    })
  })

  const { ok, data } = response as ApiResponse<SolutionUpdateResponse>

  if (!ok || !data?.sucesso) {
    toast.error(
      'Erro ao atualizar solução, atualize a página e tente novamente'
    )
    return put(solutionUpdateFailure())
  }

  toast.success('Solução atualizada com sucesso')
  return yield put(solutionUpdateSuccess())
}

export default all([
  takeLatest(Actions.SOLUTION_UPDATE_REQUEST, updateSolution)
])
