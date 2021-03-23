import { takeLatest, call, put } from 'redux-saga/effects'

import { setFrameURL } from '~/store/modules/products/actions'
import {
  productSorting,
  authProductEEM,
  authProductGUID
} from '~/store/modules/authProduct/sagas'
import {
  Actions,
  preAuth,
  authProductRequest,
  authProductSuccess,
  authProductFailure
} from '~/store/modules/authProduct/actions'
import { store } from '~/store'

import history from '~/services/history'

import refreshToken from '~/middlewares/refreshToken'

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
  it('productSorting should call refresh token then dispatch a request action', () => {
    const generator = productSorting(mockedPayload)

    expect(generator.next().value.toString()).toStrictEqual(
      call(refreshToken).toString()
    )
    expect(generator.next().value).toStrictEqual(
      put(
        authProductRequest(mockedPayload.payload, 'AUTH_PRODUCT_GUID_REQUEST')
      )
    )
    expect(generator.next().done).toBeTruthy()
  })

  it.skip('productSorting should early return when no auth, profile or user info is available', () => {
    const mockedStateNoInfo = {
      auth: undefined,
      profile: undefined,
      user: undefined
    }

    jest
      .spyOn(store, 'getState')
      .mockImplementation(() => mockedStateNoInfo as any)

    const generator = productSorting(mockedPayload)

    expect(generator.next().done).toBeTruthy()
  })

  it('productSorting should redirect user when tipoRenderizacao is `iframenoauth`', () => {
    mockedPayload.payload.tipoRenderizacao = 'iframenoauth'

    const pushSpy = jest.spyOn(history, 'push')

    const generator = productSorting(mockedPayload)

    expect(generator.next().value.toString()).toStrictEqual(
      call(refreshToken).toString()
    )

    expect(generator.next().value).toStrictEqual(
      put(
        setFrameURL({
          url: mockedPayload.payload.url,
          name: mockedPayload.payload.name
        })
      )
    )

    expect(pushSpy).toHaveBeenCalledWith(
      `/solucao/${mockedPayload.payload.product}`
    )

    expect(generator.next().done).toBeTruthy()
  })

  it('productSorting should open a new page when tipoRenderizacao is `targetblank`', () => {
    mockedPayload.payload.tipoRenderizacao = 'targetblank'

    global.open = jest.fn() as jest.Mock

    const generator = productSorting(mockedPayload)

    expect(generator.next().value.toString()).toStrictEqual(
      call(refreshToken).toString()
    )

    expect(generator.next().value).toStrictEqual(put(authProductSuccess()))

    expect(global.open).toHaveBeenCalledWith(
      mockedPayload.payload.url,
      '_blank'
    )

    expect(generator.next().done).toBeTruthy()
  })

  it('productSorting should dispatch request action when tipoRenderizacao is `iframe`', () => {
    mockedPayload.payload.tipoRenderizacao = 'iframe'

    global.open = jest.fn() as jest.Mock

    const generator = productSorting(mockedPayload)

    expect(generator.next().value.toString()).toStrictEqual(
      call(refreshToken).toString()
    )

    expect(generator.next().value).toStrictEqual(
      put(authProductRequest(mockedPayload.payload, 'AUTH_PRODUCT_EEM_REQUEST'))
    )

    expect(generator.next().done).toBeTruthy()
  })
})
