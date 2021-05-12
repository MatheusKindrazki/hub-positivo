import { takeLatest, all, Payload, put } from 'redux-saga/effects'

import { AccessControlData } from './types'
import { Actions, solutionPostFailure } from './actions'

// import api, { } from '@psdhub/api'

import { solutionPostRequest } from '../solutions/actions'

type PostAccessControlPayload = Payload<AccessControlData>

const postAccessControlData: AccessControlData = {
  solution: {
    nome: 'Solucao Teste',
    descricao: 'Esta solucao é um teste',
    arquivo: 'string',
    link: 'https://www.google.com.br',
    idCategoria: 'string',
    idProduto: 'string',
    tipoRenderizacao: 'string',
    ordem: 1,
    padrao: true
  },
  schoolPermissions: {
    remove: {
      idSolucao: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      idsEscolas: [
        '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        '4fa85f64-1212-4562-b3fc-2c963f66afa7'
      ],
      restricao: 'Ocultar'
    },
    create: {
      idSolucao: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      idsEscolas: [
        '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        '4fa85f64-1212-4562-b3fc-2c963f66afa7'
      ],
      restricao: 'Ocultar'
    }
  },
  profilePermissions: {
    create: {
      idSolucao: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      idsPerfilNivelDeEnsino: [
        '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        '4fa85f64-1212-4562-b3fc-2c963f66afa7'
      ],
      restricao: 'Ocultar'
    },
    remove: {
      idSolucao: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      idsPerfilNivelDeEnsino: [
        '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        '4fa85f64-1212-4562-b3fc-2c963f66afa7'
      ],
      restricao: 'Ocultar'
    }
  }
}

export function* postAccessControl({
  payload
}: PostAccessControlPayload): Generator {
  const { solution, profilePermissions, schoolPermissions } = payload
  console.log({ postAccessControlData, profilePermissions, schoolPermissions })
  try {
    yield put(solutionPostRequest(solution))
    // yield put('vinculaPerfilNivelDeEnsino')
  } catch (error) {
    return put(solutionPostFailure())
  }

  // atualizar solução
}

// export function* putAccessControl({
//   payload
// }: PostAccessControlPayload): Generator {
//   // const { solution, permissions } = payload
// }

export default all([
  takeLatest(Actions.ACCESS_CONTROL_POST_REQUEST, postAccessControl)
  // takeLatest(Actions.ACCESS_CONTROL_PUT_REQUEST, putAccessControl)
])
