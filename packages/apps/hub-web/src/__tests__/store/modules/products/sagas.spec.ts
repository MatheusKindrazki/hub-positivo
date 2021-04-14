import { runSaga } from 'redux-saga'

import { getTourRequest } from '~/store/modules/tour/actions'
import { getProducts } from '~/store/modules/products/sagas'
import { productSuccess } from '~/store/modules/products/actions'
import { mhundArvoreIntegration } from '~/store/modules/productIntegrations/actions'
import {
  enableRefreshTokenMiddleware,
  loading
} from '~/store/modules/global/actions'
import { withoutAccess } from '~/store/modules/auth/actions'

import { toast } from '@hub/common/utils'
import api from '@hub/api'

import store, { mockState } from '~/__mocks__/fakeStore.mock'
import mockedApiGetResponse from '~/__mocks__/api/fakeProductsApiResponse.json'

describe('testing getProducts saga flow', () => {
  let dispatchedActions = store.getActions()

  mockState.profile = { guid: 'PROFESSOR' } as any
  mockState.educationalStage = { level: 'level' } as any
  mockState.user = {
    user: 'fake user',
    school: { value: 'fake school' }
  } as any

  const spyApiGet = jest
    .spyOn(api, 'get')
    .mockImplementation(() => Promise.resolve<any>(mockedApiGetResponse))

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })
  it('should set loadings, call api, dispatch success action, call mhunArvoreIntegration, get tour and enable refresh token middleware', async () => {
    const fakeApiCall = { IdEscola: 'fake school', NivelEnsino: 'level' }
    const productSuccessPayload = {
      data: [
        {
          ativo: true,
          cor: 'fakeColor',
          id: 'fakeProductId',
          nome: 'Fake Product',
          solucoes: [
            {
              arquivo: 'arquivo fake',
              ativo: true,
              descricao: 'this is a fake solution',
              id: 'fakeSolutionId',
              nome: 'Fake Solution',
              tipoRenderizacao: 'iframeblank'
            }
          ]
        }
      ]
    }

    await runSaga(store, getProducts).toPromise()

    expect(dispatchedActions).toContainObject(loading(true))
    expect(spyApiGet).toHaveBeenCalledWith(
      'Categoria/Solucoes/Perfil/PROFESSOR',
      fakeApiCall
    )
    expect(dispatchedActions).toContainObject(loading(false))
    expect(dispatchedActions).toContainObject(
      productSuccess(productSuccessPayload)
    )
    expect(dispatchedActions).toContainObject(mhundArvoreIntegration())
    expect(dispatchedActions).toContainObject(getTourRequest())
    expect(dispatchedActions).toContainObject(
      enableRefreshTokenMiddleware(true)
    )
  })

  it('should call toast error when api returns with an error', async () => {
    mockState.profile = { guid: 'guid' } as any
    const mockedApiErrorResponse = { ok: false, status: 500 }
    spyApiGet.mockImplementation(() =>
      Promise.resolve<any>(mockedApiErrorResponse)
    )
    const spyToast = jest.spyOn(toast, 'error')
    await runSaga(store, getProducts).toPromise()
    expect(dispatchedActions).toContainObject(loading(true))
    expect(spyToast).toHaveBeenCalledWith(
      'Erro ao buscar soluções, tente novamente mais tarde!'
    )
  })

  it('should dispatch a withoutAccess action and early return a user without the correct level', async () => {
    mockState.educationalStage = { level: null } as any
    mockState.profile = { guid: 'PROFESSOR' } as any
    await runSaga(store, getProducts).toPromise()
    expect(dispatchedActions).toContainObject(loading(false))
    expect(dispatchedActions).toContainObject(withoutAccess())
  })

  it('should early return when theres no user or school info', async () => {
    mockState.user = { info: undefined, school: undefined } as any
    await runSaga(store, getProducts).toPromise()
    expect(dispatchedActions).toContainObject(loading(true))
    expect(dispatchedActions.length).toBe(1)
  })
})
