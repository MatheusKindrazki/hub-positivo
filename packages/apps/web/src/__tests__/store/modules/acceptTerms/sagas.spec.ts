import { runSaga } from 'redux-saga'

import * as sagas from '~/store/modules/acceptTerms/sagas'
import * as actions from '~/store/modules/acceptTerms/actions'

import { getInstance } from '@psdhub/api'

import store from '~/__mocks__/fakeStore.mock'

let dispatchedActions = store.getActions()

describe('acceptTerms sagas', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })

  it('Should dispatch acceptTermsSuccess action when api`s returns is an ok: true', async () => {
    const api = getInstance('default')

    const spyApiPost = jest
      .spyOn(api, 'post')
      .mockImplementation(() => Promise.resolve<any>({ ok: true }))

    await runSaga(store, sagas.acceptTerms).toPromise()

    expect(spyApiPost).toHaveBeenCalledWith(
      '/conta/TermosDeUso/MarcarLeitura',
      { versaoLida: '1.0.0' }
    )

    expect(dispatchedActions).toContainObject(actions.acceptTermsSuccess())
  })

  it('Should dispatch acceptTermsFailure action when api`s returns is an ok: false', async () => {
    const api = getInstance('default')

    jest
      .spyOn(api, 'post')
      .mockImplementation(() => Promise.resolve<any>({ ok: false }))

    await runSaga(store, sagas.acceptTerms).toPromise()

    expect(dispatchedActions).toContainObject(actions.acceptTermsFailure())
  })
})
describe('checkingTerms sagas', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })

  it('Should dispatch checkTermsSuccess action when api`s returns is an ok: true and first call is false', async () => {
    const api = getInstance('default')

    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementation(() =>
        Promise.resolve<any>({ ok: true, data: [{ versaoLida: '1.1.0' }] })
      )

    jest.spyOn(store, 'getState').mockReturnValue({
      auth: { reduced_token: 'reduced' },
      acceptTerms: { firstCall: false }
    } as any)

    await runSaga(store, sagas.checkingTerms).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith(
      '/conta/TermosDeUso/ConsultarLeitura'
    )

    expect(dispatchedActions).toContainObject(actions.checkTermsSuccess(false))
  })

  it('Should dispatch checkTermsFailure action when api`s returns is an ok: false and first call is false', async () => {
    const api = getInstance('default')

    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementation(() =>
        Promise.resolve<any>({ ok: false, data: [{ versaoLida: '1.1.0' }] })
      )

    jest.spyOn(store, 'getState').mockReturnValue({
      auth: { reduced_token: 'reduced' },
      acceptTerms: { firstCall: false }
    } as any)

    await runSaga(store, sagas.checkingTerms).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith(
      '/conta/TermosDeUso/ConsultarLeitura'
    )

    expect(dispatchedActions).toContainObject(actions.checkTermsFailure())
  })

  it('Should dispatch no action when first call is true', async () => {
    jest.spyOn(store, 'getState').mockReturnValue({
      auth: { reduced_token: 'reduced' },
      acceptTerms: { firstCall: true }
    } as any)

    await runSaga(store, sagas.checkingTerms).toPromise()

    expect(dispatchedActions).toEqual([])
  })
})
