import { runSaga } from 'redux-saga'

import { CardProduct } from '~/store/modules/products/types'
import { productIntegration } from '~/store/modules/products/actions'
import * as sagas from '~/store/modules/productIntegrations/sagas'

import { apiLivro, apiMHUND } from '@psdhub/api'

import store, { mockState } from '~/__mocks__/fakeStore.mock'

import cards from './mock.json'
import compareCards from './compareMock.json'

let dispatchedActions = store.getActions()
describe('Sagas of productIntegrations history', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })

  it('Should return the MHUND and tree cards with the appropriate application links', async () => {
    mockState.products = {
      loading: false,
      data: cards as CardProduct[]
    }

    const returnedMock = {
      ok: true,
      originalError: null,
      problem: null,
      data: {
        redirects_to: 'http://mock.com.br'
      }
    }

    jest
      .spyOn(apiLivro, 'post')
      .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))
    jest
      .spyOn(apiMHUND, 'post')
      .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

    await runSaga(store, sagas.mhundArvoreIntegration).toPromise()

    expect(dispatchedActions).toContainObject(productIntegration(compareCards))
  })

  it('Should return undefined case if you do not have cards loaded', async () => {
    mockState.products = {
      loading: false,
      data: []
    }

    const returnedMock = {
      ok: true,
      originalError: null,
      problem: null,
      data: {}
    }

    jest
      .spyOn(apiLivro, 'post')
      .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))
    jest
      .spyOn(apiMHUND, 'post')
      .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

    const resolved = await runSaga(store, sagas.mhundArvoreIntegration).result()

    expect(resolved).toBeUndefined()
  })

  it('Should return the MHUND card and not the arvore card', async () => {
    const filterCard = cards.filter(e => e.nome !== 'Conteúdo')

    mockState.products = {
      loading: false,
      data: filterCard as CardProduct[]
    }

    const returnedMock = {
      ok: true,
      originalError: null,
      problem: null,
      data: {}
    }

    jest
      .spyOn(apiLivro, 'post')
      .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

    const removeArvoreCard = compareCards.filter(e => e.nome !== 'Conteúdo')

    jest
      .spyOn(apiMHUND, 'post')
      .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

    await runSaga(store, sagas.mhundArvoreIntegration).toPromise()

    expect(dispatchedActions).toContainObject(
      productIntegration(removeArvoreCard)
    )
  })
})
