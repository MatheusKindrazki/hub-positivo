import { ApiResponse } from 'apisauce'

import { call, takeLatest, all, Payload } from 'redux-saga/effects'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import { Solution, SolutionUpdateResponse } from './types'
import { Actions } from './actions'

type UpdateSolutionPayload = Payload<Solution>

export function* updateSolution({ payload }: UpdateSolutionPayload): Generator {
  const response = yield call(async () => {
    return api.put('Categoria/Solucoes', {
      ...payload
    })
  })

  const { ok, data } = response as ApiResponse<SolutionUpdateResponse>
  console.log({ ok, data })

  if (!ok || !data?.sucesso) {
    toast.error(data?.mensagem)
  }

  toast.success('Solução atualizada com sucesso')
}

export default all([
  takeLatest(Actions.SOLUTION_UPDATE_REQUEST, updateSolution)
])
