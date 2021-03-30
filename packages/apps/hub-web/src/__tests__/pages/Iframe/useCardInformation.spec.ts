import * as router from 'react-router-dom'
import { renderHook } from '@testing-library/react-hooks'
import { waitFor } from '@testing-library/dom'

import { store } from '~/store'

import history from '~/services/history'

import * as service from '~/pages/Iframe/services/getCardBySlug'
import useCardInformation from '~/pages/Iframe/hook/useCardInformation'

const mockedState = {
  profile: { guid: 'th1s-1s-4-f4k3-gu1d' },
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
  const spyPush = jest.spyOn(history, 'push').mockImplementation()
  const spyDispatch = jest.spyOn(store, 'dispatch')
  const dispatchedAction = {
    payload: {
      name: 'test-card',
      product: 'testcard',
      subpath: '',
      tipoRenderizacao: 'wordpress',
      url: 'http://test-card.com'
    },
    type: '@auth/AUTH_PRODUCT_REQUEST'
  }

  it('useCardInformation creates card and dispatches preAuth action', async () => {
    const spyGetCardBySlug = jest
      .spyOn(service, 'getCardBySlug')
      .mockImplementationOnce(() => Promise.resolve<any>(cardSlug))

    renderHook(() => useCardInformation())

    expect(spyGetCardBySlug).toHaveBeenCalledWith({
      nivelEnsino: 'fake-level',
      perfil: 'th1s-1s-4-f4k3-gu1d',
      slug: 'fake-solution'
    })
    await waitFor(() =>
      expect(spyDispatch).toHaveBeenCalledWith(dispatchedAction)
    )
  })

  it('if getCardBySlug returns no card user should be redirected', async () => {
    jest
      .spyOn(service, 'getCardBySlug')
      .mockImplementation(() => Promise.resolve<any>(undefined))

    renderHook(() => useCardInformation())
    await waitFor(() => expect(spyPush).toHaveBeenCalledWith('/'))
  })

  it('should dispatch preAuth action with subpath as an empty string when path includes undefined', async () => {
    jest
      .spyOn(service, 'getCardBySlug')
      .mockImplementation(() => Promise.resolve<any>(cardSlug))

    // mudando implementacao do useParams com spyOn
    jest
      .spyOn(router, 'useParams')
      .mockReturnValueOnce({ solution: 'asd', subpath: 'undefined' })

    renderHook(() => useCardInformation())
    await waitFor(() => expect(spyPush).toHaveBeenCalledWith('/'))
  })

  it('should set url as empty string when given cardSlug has no link', async () => {
    jest
      .spyOn(service, 'getCardBySlug')
      .mockImplementation(() => Promise.resolve<any>(cardSlugWithoutLink))

    renderHook(() => useCardInformation())
    await waitFor(() => expect(spyPush).toHaveBeenCalledWith('/'))
  })
})
