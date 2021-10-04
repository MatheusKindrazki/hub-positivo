import { cloneDeep } from 'lodash'

import { runSaga } from 'redux-saga'

import { loading } from '~/store/modules/global/actions'
import {
  productSorting,
  authProductGUID,
  authProductEEM,
  authMcf
} from '~/store/modules/authProduct/sagas'
import {
  authProductFailure,
  authProductRequest,
  authProductSuccess
} from '~/store/modules/authProduct/actions'

import { toast, isMobile } from '@psdhub/common/utils'
import { getInstance } from '@psdhub/api'

import history from '~/services/history'

import * as orchestrator from '~/orchestrator'
import refreshTokenMiddleware from '~/middlewares/refreshToken'
import store, { mockState } from '~/__mocks__/fakeStore.mock'

jest.mock('~/middlewares/refreshToken')

jest.mock('~/orchestrator', () => ({
  loadScripts: jest.fn(() => 'resMcf')
}))

const pushSpy = jest.spyOn(history, 'push')

const mockedPayload = {
  payload: {
    tipoRenderizacao: '',
    url: 'http://produtoteste.com',
    product: 'Teste',
    name: 'Produto Teste'
  },
  error: undefined,
  meta: undefined,
  type: ''
}

describe('Testing productSorting saga flow', () => {
  const clonedMockState = cloneDeep(mockState)

  let dispatchedActions = store.getActions()

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })

  afterEach(() => {
    mockState.auth = clonedMockState.auth
    mockState.user = clonedMockState.user
    mockState.profile = clonedMockState.profile
  })

  it('productSorting should call refresh token then dispatch a request action', async () => {
    const refreshTokenMock = refreshTokenMiddleware as jest.Mock

    await runSaga(store, productSorting, mockedPayload).toPromise()

    expect(refreshTokenMock).toHaveBeenCalled()

    expect(dispatchedActions).toContainObject(
      authProductRequest(mockedPayload.payload, 'AUTH_PRODUCT_GUID_REQUEST')
    )
  })

  it('productSorting should redirect user when tipoRenderizacao is `iframenoauth`', async () => {
    mockedPayload.payload.tipoRenderizacao = 'iframenoauth'

    const refreshTokenMock = refreshTokenMiddleware as jest.Mock

    await runSaga(store, productSorting, mockedPayload).toPromise()

    expect(refreshTokenMock).toHaveBeenCalled()

    expect(pushSpy).toHaveBeenCalledWith('/solucao/Teste')
  })

  it('productSorting should open a new page when tipoRenderizacao is `targetblank`', async () => {
    mockedPayload.payload.tipoRenderizacao = 'targetblank'

    const spyWindowOpen = jest
      .spyOn(global, 'open')
      .mockImplementation(jest.fn())

    const refreshTokenMock = refreshTokenMiddleware as jest.Mock

    await runSaga(store, productSorting, mockedPayload).toPromise()

    expect(refreshTokenMock).toHaveBeenCalled()

    expect(spyWindowOpen).toHaveBeenCalledWith(
      'http://produtoteste.com',
      '_blank'
    )
  })

  it('productSorting should dispatch request action when tipoRenderizacao is `iframe`', async () => {
    mockedPayload.payload.tipoRenderizacao = 'iframe'

    global.open = jest.fn() as jest.Mock
    const refreshTokenMock = refreshTokenMiddleware as jest.Mock

    await runSaga(store, productSorting, mockedPayload).toPromise()

    expect(refreshTokenMock).toHaveBeenCalled()

    expect(dispatchedActions).toContainObject(
      authProductRequest(mockedPayload.payload, 'AUTH_PRODUCT_EEM_REQUEST')
    )
  })

  it('productSorting should dispatch request action when tipoRenderizacao is `wordpress`', async () => {
    mockedPayload.payload.tipoRenderizacao = 'wordpress'

    global.open = jest.fn() as jest.Mock
    const refreshTokenMock = refreshTokenMiddleware as jest.Mock

    await runSaga(store, productSorting, mockedPayload).toPromise()

    expect(refreshTokenMock).toHaveBeenCalled()

    expect(dispatchedActions).toContainObject(
      authProductRequest(mockedPayload.payload, 'AUTH_PRODUCT_GUID_REQUEST')
    )
  })

  it('productSorting should dispatch request action when tipoRenderizacao is `microfronend`', async () => {
    mockedPayload.payload.tipoRenderizacao = 'microfrontend'

    global.open = jest.fn() as jest.Mock
    const refreshTokenMock = refreshTokenMiddleware as jest.Mock

    await runSaga(store, productSorting, mockedPayload).toPromise()

    expect(refreshTokenMock).toHaveBeenCalled()

    expect(dispatchedActions).toContainObject(
      authProductRequest(mockedPayload.payload, 'MICRO_FRONTEND_REQUEST')
    )
  })

  it('productSorting should early return when no auth, profile or user info is available', async () => {
    mockState.auth = undefined as unknown as any
    mockState.profile = undefined as unknown as any
    mockState.user = undefined as unknown as any

    await runSaga(store, productSorting, mockedPayload).toPromise()

    expect(dispatchedActions.length).toBe(0)
  })
})

describe('testing authProductGUID saga flow', () => {
  const clonedMockState = cloneDeep(mockState)

  let dispatchedActions = store.getActions()

  const mockedResponse = {
    data: 'test',
    ok: true
  }

  afterEach(() => {
    mockState.auth = clonedMockState.auth
    mockState.user = clonedMockState.user
    mockState.profile = clonedMockState.profile
  })

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })

  it('should set loading, make a post request, redirect user, set iframe and dispatch success action', async () => {
    mockedPayload.payload.tipoRenderizacao = ''
    const { payload } = mockedPayload
    const apiPostArgs = {
      product: payload.product,
      token: mockState.auth.token,
      reduced_token: mockState.auth.reduced_token,
      logged_in: {
        school: {
          name: mockState.user.school?.label,
          id: mockState.user.school?.value,
          class: mockState.educationalStage.level
        },
        profile: mockState.profile.guid,
        user_id: mockState.user.info?.integration_id
      },
      expire_in: mockState.auth.exp
    }
    const headers = { headers: { Authorization: 'Bearer null' } }

    const expectedSuccessPayload = {
      mcf: false,
      productData: 'http://produtoteste.com/test/',
      productName: 'Produto Teste'
    }

    const api = getInstance('auth')

    const spyPost = jest
      .spyOn(api, 'post')
      .mockImplementation(() => Promise.resolve<any>(mockedResponse))

    await runSaga(store, authProductGUID, mockedPayload).toPromise()

    expect(dispatchedActions).toContainObject(loading(true))
    expect(spyPost).toHaveBeenCalledWith(
      'api/TokenStorage',
      apiPostArgs,
      headers
    )
    expect(pushSpy).toHaveBeenCalledWith('/solucao/Teste/')

    expect(dispatchedActions).toContainObject(loading(false))
    expect(dispatchedActions).toContainObject(
      authProductSuccess(expectedSuccessPayload)
    )
  })

  it('should redirect user to correct path when payload has a subpath', async () => {
    const mockedPayloadWithSubpath = {
      payload: {
        tipoRenderizacao: '',
        url: 'http://produtoteste.com',
        product: 'Teste',
        name: 'Produto Teste',
        subpath: 'subpath'
      },
      error: undefined,
      meta: undefined,
      type: ''
    }
    await runSaga(store, authProductGUID, mockedPayloadWithSubpath).toPromise()

    expect(pushSpy).toHaveBeenCalledWith('/solucao/Teste/subpath')
  })

  it('should send a tost and dispatch failure action when post response has a error', async () => {
    mockedResponse.ok = false
    const spyToast = jest.spyOn(toast, 'error')

    const api = getInstance('auth')
    const spyPost = jest
      .spyOn(api, 'post')
      .mockImplementation(() => Promise.resolve<any>(mockedResponse))

    await runSaga(store, authProductGUID, mockedPayload).toPromise()

    expect(dispatchedActions).toContainObject(loading(true))
    expect(spyPost).toHaveBeenCalled()
    expect(spyToast).toHaveBeenCalledWith('Sinto muito, algo deu errado :(')
    expect(dispatchedActions).toContainObject(loading(false))
    expect(dispatchedActions).toContainObject(authProductFailure())
  })

  it('productSorting should early return when no auth, profile or user info is available', async () => {
    mockState.auth = undefined as unknown as any
    mockState.profile = undefined as unknown as any
    mockState.user = undefined as unknown as any

    await runSaga(store, authProductGUID, mockedPayload).toPromise()

    expect(dispatchedActions.length).toBe(0)
  })
})

describe('testing authProductEEM saga flow', () => {
  let dispatchedActions = store.getActions()

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })

  it('should set loading and set iframe url', async () => {
    await runSaga(store, authProductEEM, mockedPayload).toPromise()
    expect(dispatchedActions).toContainObject(loading(true))
  })

  it('should open a new window when tipoRenderizacao is `iframeblank` and the device is IOS', async () => {
    jest.spyOn(isMobile, 'iOS').mockReturnValue(true)
    mockedPayload.payload.tipoRenderizacao = 'iframeblank'
    const spyWindowOpen = jest
      .spyOn(global, 'open')
      .mockImplementation(jest.fn())

    await runSaga(store, authProductEEM, mockedPayload).toPromise()
    expect(dispatchedActions).toContainObject(loading(true))
    expect(spyWindowOpen).toHaveBeenCalledWith(
      'http://produtoteste.com',
      '_blank'
    )
    expect(dispatchedActions).toContainObject(loading(true))
  })
})

describe('testing authMcf saga flow', () => {
  let dispatchedActions = store.getActions()
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()
    dispatchedActions = store.getActions()
  })

  it('Should dispatch a success auth action', async () => {
    await runSaga(store, authMcf, mockedPayload).toPromise()

    const spyPush = jest.spyOn(history, 'push')

    expect(dispatchedActions).toStrictEqual([
      loading(true),
      authProductSuccess({
        mcf: true,
        productData: 'resMcf',
        productName: 'Produto Teste'
      }),
      loading(false)
    ])

    expect(spyPush).toHaveBeenCalledWith('/solucao/Teste/')
  })

  it('Should dispatch a toast warn when loadScripts returns an error', async () => {
    jest.spyOn(orchestrator, 'loadScripts').mockImplementation(() => {
      throw new Error()
    })

    const spyPush = jest.spyOn(history, 'push')

    const spyToast = jest.spyOn(toast, 'warn')

    await runSaga(store, authMcf, mockedPayload).toPromise()

    expect(spyToast).toHaveBeenCalledWith(
      'Estamos com dificuldades para carregar a solução, tente novamente em breve!'
    )

    expect(spyPush).toHaveBeenCalledWith('/')
  })
})
