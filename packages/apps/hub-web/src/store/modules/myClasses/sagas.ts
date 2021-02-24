import { ApiResponse } from 'apisauce'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import { loading } from '~/store/modules/global/actions'
import { store } from '~/store'

import { toast } from '@hub/common/utils'

import { EEMConnectGET } from '~/services/eemConnect'

import { ClassesAPI } from './types'
import { Actions, classesFailure, classesSuccess } from './actions'

interface SendInfo {
  usuarioId: string
}

export function* getClasses(): Generator {
  yield put(loading(true))

  const { school } = store.getState().user
  const { reduced_token } = store.getState().auth

  const response = yield call(() => {
    return EEMConnectGET<SendInfo>({
      endpoint: '/v1/Academico/turmas',
      token: reduced_token as string,
      data: {
        usuarioId: school?.user_id as string
      }
    })
  })

  const { ok, data } = response as ApiResponse<{ conteudo: ClassesAPI[] }>

  const prepareData: ClassesAPI[] | undefined = data?.conteudo
    .map(i => {
      return {
        id: i.id,
        ativo: i.ativo,
        alunos: i.alunos,
        nome: i.nome,
        serie: i.serie
      }
    })
    .filter(i => i.ativo)

  yield put(loading(false))

  if (!ok) {
    toast.error('Erro ao buscar turmas!')
    return yield put(classesFailure())
  }

  return yield put(classesSuccess(prepareData))
}

export default all([takeLatest(Actions.GET_REQUEST, getClasses)])
