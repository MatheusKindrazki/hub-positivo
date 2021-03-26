import { runSaga } from 'redux-saga'

import { getTour, getViewed, postTour } from '~/store/modules/tour/sagas'
import {
  getTourViewedFailure,
  getTourViewedRequest,
  getTourFailure,
  getTourSuccess,
  getTourViewedSuccess,
  openTour
} from '~/store/modules/tour/actions'

import api from '@hub/api'

import store, { mockState } from '~/__mocks__/fakeStore.mock'

const mockedTourApiResponse = {
  ok: true,
  status: 200,
  data: [
    {
      seletor: 'testing tour saga',
      conteudo: 'this is a test'
    }
  ]
}
const mockedTourApiErrorResponse = { ok: false, data: 'error' }

describe('testing getProducts saga flow', () => {
  let dispatchedActions = store.getActions()

  mockState.profile = { guid: 'PROFESSOR' } as any
  mockState.educationalStage = { level: 'level' } as any
  mockState.tour = { viewedLoaded: false } as any
  mockState.user = {
    user: 'fake user',
    school: { value: 'fake school' }
  } as any

  const spyApiGet = jest
    .spyOn(api, 'get')
    .mockImplementation(() => Promise.resolve<any>(mockedTourApiResponse))

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })
  it('should dispatch tour request action, make get request do tour api and dispatch success action', async () => {
    const payload = [
      { content: 'this is a test', selector: 'testing tour saga' }
    ]

    await runSaga(store, getTour).toPromise()

    expect(dispatchedActions).toContainObject(getTourViewedRequest())
    expect(spyApiGet).toHaveBeenCalledWith(
      '/Tour/Steps?perfil=PROFESSOR&nivelEnsino=level'
    )
    expect(dispatchedActions).toContainObject(getTourSuccess(payload))
  })

  it('should not include educational level on tour request if user is not PROFESSOR or ALUNO', async () => {
    mockState.tour = { viewedLoaded: true } as any
    mockState.profile = { guid: 'PERFIL' } as any
    const payload = [
      { content: 'this is a test', selector: 'testing tour saga' }
    ]

    await runSaga(store, getTour).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith('/Tour/Steps?perfil=PERFIL')
    expect(dispatchedActions).toContainObject(getTourSuccess(payload))
  })

  it('should log error and dispatch failure action when api returns with an error', async () => {
    const spyError = jest.spyOn(console, 'error').mockImplementation(jest.fn())
    spyApiGet.mockImplementation(() =>
      Promise.resolve<any>(mockedTourApiErrorResponse)
    )
    await runSaga(store, getTour).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith('/Tour/Steps?perfil=PERFIL')
    expect(spyError).toHaveBeenCalledWith('error')
    expect(dispatchedActions).toContainObject(getTourFailure())
  })
})

describe('testing getViewed saga flow', () => {
  let dispatchedActions = store.getActions()

  mockState.profile = { guid: 'PROFESSOR' } as any
  mockState.educationalStage = { level: 'level' } as any
  mockState.tour = { viewedLoaded: false } as any
  mockState.user = {
    user: 'fake user',
    school: { value: 'fake school' }
  } as any

  const mockedTourViewedResponse = {
    ok: true,
    data: true
  }
  const mockedTourViewedErrorResponse = {
    ok: false,
    data: 'error'
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })
  it('should request for info on tour viewed and dispatch a success action', async () => {
    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementationOnce(() =>
        Promise.resolve<any>(mockedTourViewedResponse)
      )
    await runSaga(store, getViewed).toPromise()
    expect(spyApiGet).toHaveBeenCalledWith('/Tour')
    expect(dispatchedActions).toContainObject(
      getTourViewedSuccess({ viewed: true })
    )
  })

  it('should log error and dispatch failure action on api error', async () => {
    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementationOnce(() =>
        Promise.resolve<any>(mockedTourViewedErrorResponse)
      )
    const spyError = jest.spyOn(console, 'error').mockImplementation(jest.fn())
    await runSaga(store, getViewed).toPromise()
    expect(spyApiGet).toHaveBeenCalledWith('/Tour')
    expect(spyError).toHaveBeenCalledWith('error')

    expect(dispatchedActions).toContainObject(getTourViewedFailure())
  })
})

describe('testing getProducts saga flow', () => {
  let dispatchedActions = store.getActions()

  mockState.profile = { guid: 'PROFESSOR' } as any
  mockState.educationalStage = { level: 'level' } as any
  mockState.tour = { viewedLoaded: false } as any
  mockState.user = {
    user: 'fake user',
    school: { value: 'fake school' }
  } as any

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })
  it('should dispatch tour request action, make get request do tour api and dispatch success action', async () => {
    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementation(() => Promise.resolve<any>(mockedTourApiResponse))
    const payload = [
      { content: 'this is a test', selector: 'testing tour saga' }
    ]

    await runSaga(store, getTour).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith('/Tour/Steps?perfil=PERFIL')
    expect(dispatchedActions).toContainObject(getTourSuccess(payload))
  })

  it('should not include educational level on tour request if user is not PROFESSOR or ALUNO', async () => {
    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementation(() => Promise.resolve<any>(mockedTourApiResponse))
    mockState.profile = { guid: 'PERFIL' } as any
    const payload = [
      { content: 'this is a test', selector: 'testing tour saga' }
    ]

    await runSaga(store, getTour).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith('/Tour/Steps?perfil=PERFIL')
    expect(dispatchedActions).toContainObject(getTourSuccess(payload))
  })

  it('should log error and dispatch failure action when api returns with an error', async () => {
    const spyError = jest.spyOn(console, 'error').mockImplementation(jest.fn())
    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementation(() => Promise.resolve<any>(mockedTourApiResponse))
    spyApiGet.mockImplementation(() =>
      Promise.resolve<any>(mockedTourApiErrorResponse)
    )
    await runSaga(store, getTour).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith('/Tour/Steps?perfil=PERFIL')
    expect(spyError).toHaveBeenCalledWith('error')
    expect(dispatchedActions).toContainObject(getTourFailure())
  })
})

describe('testing post tour saga flow', () => {
  let dispatchedActions = store.getActions()

  mockState.profile = { guid: 'PROFESSOR' } as any

  const mockedPostTourResponse = {
    ok: true,
    data: true
  }
  const mockedPostTourErrorResponse = {
    ok: false,
    data: 'error'
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })
  it('should set open tour to false and post tour info', async () => {
    const spyApiPost = jest
      .spyOn(api, 'post')
      .mockImplementation(() => Promise.resolve<any>(mockedPostTourResponse))
    await runSaga(store, postTour).toPromise()
    expect(dispatchedActions).toContainObject(openTour(false))
    expect(spyApiPost).toHaveBeenCalledWith('/Tour', '"PERFIL"')
  })

  it('should log error and dispatch failure action on api error', async () => {
    const spyApiPost = jest
      .spyOn(api, 'post')
      .mockImplementation(() =>
        Promise.resolve<any>(mockedPostTourErrorResponse)
      )
    const spyError = jest.spyOn(console, 'error').mockImplementation(jest.fn())

    await runSaga(store, postTour).toPromise()

    expect(spyApiPost).toHaveBeenCalledWith('/Tour', '"PERFIL"')
    expect(spyError).toHaveBeenCalledWith('error')
  })
})
