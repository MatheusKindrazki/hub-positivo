import { runSaga } from 'redux-saga'

import * as solutionSagas from '~/store/modules/solutions/sagas'
import {
  solutionPostRequest,
  solutionPutRequest,
  solutionsGetRequest
} from '~/store/modules/solutions/actions'
import { Restricao } from '~/store/modules/permissions/types'
import * as permissionsSagas from '~/store/modules/permissions/sagas'
import {
  profilePermissionsRequest,
  schoolPermissionsRequest
} from '~/store/modules/permissions/actions'
import { loading } from '~/store/modules/global/actions'
import {
  submitSolution,
  SubmitSolution
} from '~/store/modules/accessControl/sagas'
import {
  accessControlPostRequest,
  accessControlPutRequest
} from '~/store/modules/accessControl/actions'

import { toast } from '@psdhub/common/utils'

import history from '~/services/history'

import store from '~/__mocks__/fakeStore.mock'

const mockedData = {
  solution: {
    id: 'fake id',
    solution: {},
    idCategoria: '74bc6993-400e-47e5-a92e-d212da1f4b6d',
    nome: 'Teste',
    descricao: 'Teste de criacao de solucao',
    link: 'https://teste.com',
    tipoRenderizacao: 'iframeblank',
    arquivo:
      'blob:https://dev.positivoon.com.br/08197439-d5e5-41d8-864b-3208fe3ed8f5',
    padrao: true,
    ativo: true,
    ordem: 1,
    slug: 'teste'
  },
  profilePermissions: {
    remove: {
      idSolucao: '',
      IdsPerfisNiveisEnsino: []
    },
    create: {
      idSolucao: '',
      IdsPerfisNiveisEnsino: ['6190aaa0-cbd5-488c-9b49-ab86f52728b1']
    }
  },
  schoolPermissions: {
    remove: {
      idSolucao: '',
      idsEscolas: []
    },
    create: {
      idSolucao: '',
      idsEscolas: ['6190aaa0-cbd5-488c-9b49-ab86f52728b1'],
      restricao: 'Exibir' as Restricao
    }
  }
}

describe('accessControl sagas work properly', () => {
  let dispatchedActions = store.getActions()

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })

  const spyErrorToast = jest.spyOn(toast, 'error')

  const spyPush = jest.spyOn(history, 'push').mockImplementation(jest.fn())

  const spyCreateSolution = jest
    .spyOn(solutionSagas, 'createSolution')
    .mockImplementationOnce(() => 'fake id' as any)
    .mockImplementationOnce(() => undefined as any)

  const spyUpdateSolution = jest
    .spyOn(solutionSagas, 'updateSolution')
    .mockImplementation(jest.fn())

  const spyProfilePermissions = jest
    .spyOn(permissionsSagas, 'profilePermissions')
    .mockImplementation(jest.fn())

  const spySchoolPermissions = jest
    .spyOn(permissionsSagas, 'schoolPermissions')
    .mockImplementation(jest.fn())

  it('submitSolution should create solution and set its permissions, refresh data, set loading and redirect user', async () => {
    await runSaga(
      store,
      submitSolution,
      accessControlPostRequest(mockedData) as SubmitSolution
    ).toPromise()

    expect(spyCreateSolution).toHaveBeenCalledWith(
      solutionPostRequest(mockedData.solution)
    )
    expect(spyProfilePermissions).toHaveBeenCalledWith(
      profilePermissionsRequest(mockedData.profilePermissions)
    )
    expect(spySchoolPermissions).toHaveBeenCalledWith(
      schoolPermissionsRequest(mockedData.schoolPermissions)
    )
    expect(dispatchedActions).toContainObject(solutionsGetRequest())
    expect(dispatchedActions).toContainObject(loading(false))
    expect(spyPush).toHaveBeenCalledWith('/controle-de-acessos')
  })
  it('submitSolution should call toast error, and early redirect user when no id is returned from createSolution', async () => {
    await runSaga(
      store,
      submitSolution,
      accessControlPostRequest(mockedData) as SubmitSolution
    ).toPromise()

    expect(spyCreateSolution).toHaveBeenCalledWith(
      solutionPostRequest(mockedData.solution)
    )
    expect(spyProfilePermissions).not.toHaveBeenCalled()
    expect(spySchoolPermissions).not.toHaveBeenCalled()
    expect(spyErrorToast).toHaveBeenCalledWith(
      'Erro ao criar solução, tente novamente'
    )
    expect(spyPush).toHaveBeenCalledWith('/controle-de-acessos')
  })

  it('submitSolution should update solution and its permissions on update action', async () => {
    await runSaga(
      store,
      submitSolution,
      accessControlPutRequest(mockedData) as SubmitSolution
    ).toPromise()

    expect(spyUpdateSolution).toHaveBeenCalledWith(
      solutionPutRequest(mockedData.solution)
    )
    expect(spyProfilePermissions).toHaveBeenCalledWith(
      profilePermissionsRequest(mockedData.profilePermissions)
    )
    expect(spySchoolPermissions).toHaveBeenCalledWith(
      schoolPermissionsRequest(mockedData.schoolPermissions)
    )
    expect(spyPush).toHaveBeenCalledWith('/controle-de-acessos')
  })
})
