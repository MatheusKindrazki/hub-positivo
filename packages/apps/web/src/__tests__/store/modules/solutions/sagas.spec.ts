import { runSaga } from 'redux-saga'

import {
  createSolution,
  getSolutions,
  getExcludedSolutions,
  updateSolution,
  deleteSolution,
  restoreSolution,
  reorderSolutions
} from '~/store/modules/solutions/sagas'
import {
  solutionPostRequest,
  solutionPostSuccess,
  solutionPostFailure,
  solutionsGetRequest,
  solutionsGetFailure,
  solutionsGetSuccess,
  solutionGetExcludedFailure,
  solutionGetExcludedSuccess,
  solutionPutRequest,
  solutionPutSuccess,
  solutionPutFailure,
  solutionDeleteRequest,
  solutionDeleteSuccess,
  solutionDeleteFailure,
  solutionGetExcludedRequest,
  restoreSolutionRequest,
  restoreSolutionFailure,
  restoreSolutionSuccess,
  solutionPostReorderRequest,
  solutionPostReorderFailure,
  solutionPostReorderSuccess
} from '~/store/modules/solutions/actions'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import store from '~/__mocks__/fakeStore.mock'
import fakeApiSolutionResponses from '~/__mocks__/api/fakeApiSolutionResponses.json'

describe('solutions sagas work properly', () => {
  let dispatchedActions = store.getActions()

  const {
    mockedApiPostSolutionResponse,
    mockedApiGetCategoriesResponse,
    mockedApiGetExcludedResponse,
    mockedApiPutSolutionResponse,
    mockedApiResponses
  } = fakeApiSolutionResponses

  const mockedSolution = {
    id: 'fake solution id',
    slug: 'fake-solution',
    nome: 'fake solution',
    descricao: 'fake description',
    arquivo: 'http://fakeiconurl.com',
    link: 'http://fakesolutionurl.com',
    idCategoria: 'fake category',
    tipoRenderizacao: 'microfrontend',
    ordem: 1,
    padrao: false,
    ativo: true
  }

  const spySuccessToast = jest.spyOn(toast, 'success')

  const spyErrorToast = jest.spyOn(toast, 'error')

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })
  it('createSolution should call api, call success toast and dispatch success action', async () => {
    const spyApiPost = jest
      .spyOn(api, 'post')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedApiPostSolutionResponse.success)
      )

    await runSaga(
      store,
      createSolution,
      solutionPostRequest(mockedSolution)
    ).toPromise()

    expect(spyApiPost).toHaveBeenCalledWith('Solucao', mockedSolution)
    expect(spySuccessToast).toHaveBeenCalledWith('Solução criada com sucesso')
    expect(dispatchedActions).toContainObject(solutionPostSuccess('fake id'))
  })
  it('createSolution should call toast error when api returns with an error', async () => {
    const spyApiPost = jest
      .spyOn(api, 'post')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedApiPostSolutionResponse.error)
      )

    await runSaga(
      store,
      createSolution,
      solutionPostRequest(mockedSolution)
    ).toPromise()

    expect(spyApiPost).toHaveBeenCalledWith('Solucao', mockedSolution)
    expect(spyErrorToast).toHaveBeenCalledWith('Erro ao criar solução!')
    expect(dispatchedActions).toContainObject(solutionPostFailure())
  })

  it('getSolutions should call api, and dispatch success action afterwards', async () => {
    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedApiGetCategoriesResponse.success)
      )

    const {
      success: { data }
    } = mockedApiGetCategoriesResponse

    await runSaga(store, getSolutions).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith(
      'categoria/solucoesPerfisRestricoes',
      {},
      { params: { EstadoSolucao: 'PUBLICADA' } }
    )
    expect(dispatchedActions).toContainObject(solutionsGetSuccess(data))
  })
  it('getSolutions should call toast error when api returns with an error', async () => {
    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedApiGetCategoriesResponse.error)
      )

    await runSaga(store, getSolutions).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith(
      'categoria/solucoesPerfisRestricoes',
      {},
      { params: { EstadoSolucao: 'PUBLICADA' } }
    )
    expect(spyErrorToast).toHaveBeenCalledWith(
      'Erro ao buscar as produtos por categoria!'
    )
    expect(dispatchedActions).toContainObject(solutionsGetFailure())
  })

  it('getExcludedSolutions should call api, and dispatch success action afterwards', async () => {
    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedApiGetExcludedResponse.success)
      )

    const {
      success: { data }
    } = mockedApiGetCategoriesResponse

    await runSaga(store, getExcludedSolutions).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith(
      'categoria/solucoesPerfisRestricoes',
      {},
      { params: { EstadoSolucao: 'EXCLUIDA' } }
    )
    expect(dispatchedActions).toContainObject(solutionGetExcludedSuccess(data))
  })
  it('getExcludedSolutions should call toast error when api returns with an error', async () => {
    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedApiGetExcludedResponse.error)
      )

    await runSaga(store, getExcludedSolutions).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith(
      'categoria/solucoesPerfisRestricoes',
      {},
      { params: { EstadoSolucao: 'EXCLUIDA' } }
    )
    expect(spyErrorToast).toHaveBeenCalledWith(
      'Erro ao buscar os itens da lixeira!'
    )
    expect(dispatchedActions).toContainObject(solutionGetExcludedFailure())
  })

  it('updateSolution should call api, call success toast and dispatch success action', async () => {
    const spyApiPut = jest
      .spyOn(api, 'put')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedApiPutSolutionResponse.success)
      )

    await runSaga(
      store,
      updateSolution,
      solutionPutRequest(mockedSolution)
    ).toPromise()

    expect(spyApiPut).toHaveBeenCalledWith('/solucao', mockedSolution)
    expect(dispatchedActions).toContainObject(solutionPutSuccess())
  })
  it('updateSolution should call toast error when api returns with an error', async () => {
    const spyApiPut = jest
      .spyOn(api, 'put')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedApiPutSolutionResponse.error)
      )

    await runSaga(
      store,
      updateSolution,
      solutionPutRequest(mockedSolution)
    ).toPromise()

    expect(spyApiPut).toHaveBeenCalledWith('/solucao', mockedSolution)
    expect(spyErrorToast).toHaveBeenCalledWith(
      'Erro ao atualizar solução, atualize a página e tente novamente'
    )
    expect(dispatchedActions).toContainObject(solutionPutFailure())
  })

  it('deleteSolution should call api, and dispatch success action afterwards, then refresh solutions and excluded solutions data', async () => {
    const solutionId = 'fake solution id'

    const spyApiDel = jest
      .spyOn(api, 'delete')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedApiResponses.success)
      )

    // // encontrar melhor maneira de mockar as outras sagas que serao chamadas por esta saga
    // const mockedGetSolutions = jest.fn()
    // const mockedGetExcludedSolutions = jest.fn()

    // jest.mock('~/store/modules/solutions/sagas', () => {
    //   const rest = jest.requireActual('~/store/modules/solutions/sagas')
    //   return {
    //     ...rest,
    //     getSolutions: () => mockedGetSolutions,
    //     getExcludedSolutions: () => mockedGetExcludedSolutions
    //   }
    // })

    await runSaga(
      store,
      deleteSolution,
      solutionDeleteRequest(solutionId)
    ).toPromise()

    expect(spyApiDel).toHaveBeenCalledWith('solucao/excluiCard', {
      idCard: solutionId
    })
    expect(dispatchedActions).toContainObject(solutionDeleteSuccess())
    // expect(mockedGetSolutions).toHaveBeenCalled()
    // expect(mockedGetExcludedSolutions).toHaveBeenCalled()
  })
  it('deleteSolution should call toast error when api returns with an error', async () => {
    const solutionId = 'fake solution id'

    const spyApiDel = jest
      .spyOn(api, 'delete')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedApiResponses.error.generic)
      )

    await runSaga(
      store,
      deleteSolution,
      solutionDeleteRequest(solutionId)
    ).toPromise()

    expect(spyApiDel).toHaveBeenCalledWith('solucao/excluiCard', {
      idCard: solutionId
    })
    expect(spyErrorToast).toHaveBeenCalledWith('Erro ao excluir solução!')
    expect(dispatchedActions).toContainObject(solutionDeleteFailure())
  })
  it('deleteSolution shouldn`t be able to delete an active solution', async () => {
    const solutionId = 'fake solution id'

    const spyApiDel = jest
      .spyOn(api, 'delete')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedApiResponses.error.activeSoluction)
      )

    await runSaga(
      store,
      deleteSolution,
      solutionDeleteRequest(solutionId)
    ).toPromise()

    expect(spyApiDel).toHaveBeenCalledWith('solucao/excluiCard', {
      idCard: solutionId
    })
    expect(spyErrorToast).toHaveBeenCalledWith(
      'Não é possível excluir uma solução ativa!'
    )
    expect(dispatchedActions).toContainObject(solutionDeleteFailure())
  })

  it('restoreSolution should call api, call success toast, refresh data and dispatch success action', async () => {
    const idSolucao = 'fake solution id'
    const spyApiPut = jest
      .spyOn(api, 'put')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedApiResponses.success)
      )

    await runSaga(
      store,
      restoreSolution,
      restoreSolutionRequest(idSolucao)
    ).toPromise()
    expect(dispatchedActions).toContainObject(solutionGetExcludedRequest())
    expect(dispatchedActions).toContainObject(solutionsGetRequest())
    expect(spyApiPut).toHaveBeenCalledWith(
      '/Solucao/RecuperaSolucaoDaLixeira',
      {},
      {
        params: {
          idCard: idSolucao
        }
      }
    )
    expect(dispatchedActions).toContainObject(restoreSolutionSuccess())
  })
  it('restoreSolution should call toast error and dispatch failure action when api returns with an error', async () => {
    const idSolucao = 'fake solution id'
    const spyApiPut = jest
      .spyOn(api, 'put')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedApiResponses.error.generic)
      )

    await runSaga(
      store,
      restoreSolution,
      restoreSolutionRequest(idSolucao)
    ).toPromise()

    expect(spyApiPut).toHaveBeenCalledWith(
      '/Solucao/RecuperaSolucaoDaLixeira',
      {},
      {
        params: {
          idCard: idSolucao
        }
      }
    )

    expect(spyErrorToast).toHaveBeenCalledWith(
      'Erro ao restaurar solução, tente novamente!'
    )
    expect(dispatchedActions).toContainObject(restoreSolutionFailure())
  })

  it('reorderSolutions should call api and then dispatch success action', async () => {
    const mockedReorderData = [
      {
        id: 'fake solution id',
        ordem: 2
      }
    ]

    const spyApiPost = jest
      .spyOn(api, 'post')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedApiResponses.success)
      )

    await runSaga(
      store,
      reorderSolutions,
      solutionPostReorderRequest(mockedReorderData)
    ).toPromise()

    expect(spyApiPost).toHaveBeenCalledWith(
      'solucao/reordenaCards',
      mockedReorderData
    )
    expect(dispatchedActions).toContainObject(solutionPostReorderSuccess())
  })
  it('reorderSolutions should call toast error and dispatch failure action when api returns with an error', async () => {
    const mockedReorderData = [
      {
        id: 'fake solution id',
        ordem: 2
      }
    ]

    const spyApiPost = jest
      .spyOn(api, 'post')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedApiResponses.error.generic)
      )

    await runSaga(
      store,
      reorderSolutions,
      solutionPostReorderRequest(mockedReorderData)
    ).toPromise()

    expect(spyApiPost).toHaveBeenCalledWith(
      'solucao/reordenaCards',
      mockedReorderData
    )
    expect(spyErrorToast).toHaveBeenCalledWith(
      'Nenhuma solução foi reordenada, tente novamente!'
    )
    expect(dispatchedActions).toContainObject(solutionPostReorderFailure())
  })
})
