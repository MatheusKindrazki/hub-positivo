import { cloneDeep } from 'lodash'

import { runSaga } from 'redux-saga'

import { setFrameURL } from '~/store/modules/products/actions'
import { loading } from '~/store/modules/global/actions'
import {
  productSorting,
  authProductGUID,
  authProductEEM
} from '~/store/modules/authProduct/sagas'
import {
  authProductFailure,
  authProductRequest,
  authProductSuccess
} from '~/store/modules/authProduct/actions'

import { toast } from '@psdhub/common/utils'
import { apiAuthProduct } from '@psdhub/api'

import history from '~/services/history'

import isMobile from '~/utils/isMobile'

import refreshTokenMiddleware from '~/middlewares/refreshToken'
import store, { mockState } from '~/__mocks__/fakeStore.mock'

jest.mock('~/middlewares/refreshToken')

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

    expect(dispatchedActions).toContainObject(
      setFrameURL({
        url: 'http://produtoteste.com',
        name: 'Produto Teste'
      })
    )

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

    expect(dispatchedActions).toContainObject(authProductSuccess())

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

    const spyPost = jest
      .spyOn(apiAuthProduct, 'post')
      .mockImplementation(() => Promise.resolve<any>(mockedResponse))

    await runSaga(store, authProductGUID, mockedPayload).toPromise()

    expect(dispatchedActions).toContainObject(loading(true))
    expect(spyPost).toHaveBeenCalledWith(
      'api/TokenStorage',
      apiPostArgs,
      headers
    )
    expect(pushSpy).toHaveBeenCalledWith('/solucao/Teste/')
    expect(dispatchedActions).toContainObject(
      setFrameURL({
        url: 'http://produtoteste.com',
        name: 'Produto Teste'
      })
    )
    expect(dispatchedActions).toContainObject(loading(false))
    expect(dispatchedActions).toContainObject(authProductSuccess())
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
    const spyPost = jest
      .spyOn(apiAuthProduct, 'post')
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

  it('should set loading, set iframe url and then dispatch success action', async () => {
    await runSaga(store, authProductEEM, mockedPayload).toPromise()
    expect(dispatchedActions).toContainObject(loading(true))
    expect(dispatchedActions).toContainObject(
      setFrameURL({
        url: 'http://produtoteste.com',
        name: 'Produto Teste'
      })
    )
    expect(dispatchedActions).toContainObject(loading(true))
    expect(dispatchedActions).toContainObject(authProductSuccess())
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
    expect(dispatchedActions).toContainObject(authProductSuccess())
  })
})
