import { runSaga } from 'redux-saga'

import * as sagas from '~/store/modules/myClasses/sagas'
import * as actions from '~/store/modules/myClasses/actions'

import { toast } from '@psdhub/common/utils'

import * as eem from '~/services/eemConnect'

import store from '~/__mocks__/fakeStore.mock'
import fakeResponse from '~/__mocks__/api/fakeClassesResponse.json'

let dispatchedActions = store.getActions()

describe('Sagas of myClasses history', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })

  it('Should seek the list of students of a class and return only the assets', async () => {
    const returnedMock = {
      ok: true,
      originalError: null,
      problem: null,
      data: fakeResponse
    }

    jest
      .spyOn(eem, 'EEMConnectGET')
      .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

    const compareMock = fakeResponse.conteudo
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

    await runSaga(store, sagas.getClasses).toPromise()

    expect(dispatchedActions).toContainObject(
      actions.classesSuccess(compareMock)
    )
  })

  it('Should show an error for the user if the search for the list of students returned an exception', async () => {
    const returnedMock = {
      ok: false,
      originalError: null,
      problem: null,
      data: null
    }

    jest
      .spyOn(eem, 'EEMConnectGET')
      .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

    const mockToast = jest.spyOn(toast, 'error')

    await runSaga(store, sagas.getClasses).toPromise()

    expect(dispatchedActions).toContainObject(actions.classesFailure())
    expect(mockToast).toBeCalledWith('Erro ao buscar turmas!')
  })
})
