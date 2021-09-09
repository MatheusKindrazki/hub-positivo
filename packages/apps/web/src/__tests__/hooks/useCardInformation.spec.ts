import * as router from 'react-router-dom'
import { renderHook } from '@testing-library/react-hooks'
import { waitFor } from '@testing-library/dom'

import { store } from '~/store'

import history from '~/services/history'
import * as service from '~/services/getCardBySlug'

import useCardInformation from '~/hooks/useCardInformation'

const mockedState = {
  profile: { guid: 'PROFESSOR' },
  educationalStage: { level: 'fake-level' }
}

const cardSlug = {
  nome: 'test-card',
  link: 'http://test-card.com',
  tipoRenderizacao: 'wordpress'
}

const cardSlugWithoutLink = {
  nome: 'test-card',
  tipoRenderizacao: 'wordpress'
}

jest.mock('~/store', () => ({
  store: {
    getState: jest.fn().mockImplementation(() => mockedState),
    dispatch: jest.fn()
  }
}))

jest.mock('react-router-dom', () => {
  const ui = jest.requireActual('react-router-dom')
  return {
    ...ui,
    useParams: jest.fn(() => ({ solution: 'fake-solution' }))
  }
})

describe('useCardInformation should work as expected', () => {
  afterEach(jest.clearAllMocks)

  const spyPush = jest.spyOn(history, 'push').mockImplementation()
  const spyDispatch = jest.spyOn(store, 'dispatch')
  const dispatchedAction = {
    payload: {
      name: 'test-card',
      product: 'testcard',
      subpath: 'subpath',
      tipoRenderizacao: 'wordpress',
      url: 'http://test-card.com'
    },
    type: '@auth/AUTH_PRODUCT_REQUEST'
  }

  it('useCardInformation gets card slug and dispatches preAuth action', async () => {
    jest.useFakeTimers()
    jest.spyOn(router, 'useParams').mockReturnValue({
      solution: 'solution',
      subpath: 'subpath'
    })
    const spyGetCardBySlug = jest
      .spyOn(service, 'getCardBySlug')
      .mockImplementation(() => Promise.resolve<any>(cardSlug))

    await renderHook(async () => useCardInformation())

    jest.runAllTimers()

    await waitFor(() =>
      expect(spyGetCardBySlug).toHaveBeenCalledWith({
        nivelEnsino: 'fake-level',
        perfil: 'PROFESSOR',
        slug: 'solution'
      })
    )
    await waitFor(() =>
      expect(spyDispatch).toHaveBeenCalledWith(dispatchedAction)
    )
  })

  it('useCardInformation gets card slug and dispatches preAuth action when guid is not /ALUNO/ or /PROFESSOR/', async () => {
    jest.useFakeTimers()
    jest.spyOn(router, 'useParams').mockReturnValue({
      solution: 'solution',
      subpath: 'subpath'
    })

    jest.spyOn(store, 'getState').mockImplementation(
      () =>
        ({
          profile: { guid: 'none' },
          educationalStage: { level: 'fake-level' }
        } as any)
    )
    const spyGetCardBySlug = jest
      .spyOn(service, 'getCardBySlug')
      .mockImplementation(() => Promise.resolve<any>(cardSlug))

    await renderHook(async () => useCardInformation())

    jest.runAllTimers()

    await waitFor(() =>
      expect(spyGetCardBySlug).toHaveBeenCalledWith({
        nivelEnsino: '',
        perfil: 'none',
        slug: 'solution'
      })
    )
    await waitFor(() =>
      expect(spyDispatch).toHaveBeenCalledWith(dispatchedAction)
    )
  })
  it('if getCardBySlug returns no card user should be redirected', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({
      solution: 'solution',
      subpath: 'subpath'
    })
    jest
      .spyOn(service, 'getCardBySlug')
      .mockImplementationOnce(() => Promise.resolve<any>(undefined))

    renderHook(() => useCardInformation())
    await waitFor(() => expect(spyPush).toHaveBeenCalledWith('/'))
  })

  it('should dispatch preAuth action with subpath as an empty string when path is undefined', async () => {
    dispatchedAction.payload.subpath = ''
    jest
      .spyOn(router, 'useParams')
      .mockReturnValueOnce({ solution: 'solution', subpath: undefined })

    renderHook(() => useCardInformation())
    await waitFor(() =>
      expect(spyDispatch).toHaveBeenCalledWith(dispatchedAction)
    )
  })

  it('should set url as empty string when given cardSlug has no link', async () => {
    // alterando mock para que url no payload seja uma string vazia
    dispatchedAction.payload.url = ''
    dispatchedAction.payload.subpath = ''
    jest
      .spyOn(router, 'useParams')
      .mockReturnValueOnce({ solution: 'solution', subpath: 'undefined' })
    jest
      .spyOn(service, 'getCardBySlug')
      .mockImplementationOnce(() => Promise.resolve<any>(cardSlugWithoutLink))

    renderHook(() => useCardInformation())
    await waitFor(() =>
      expect(spyDispatch).toHaveBeenCalledWith(dispatchedAction)
    )
  })
})
