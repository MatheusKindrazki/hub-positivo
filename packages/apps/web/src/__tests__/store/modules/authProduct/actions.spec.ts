import {
  preAuth,
  authProductRequest,
  authProductSuccess,
  authProductFailure
} from '~/store/modules/authProduct/actions'

const mockedTypes = {
  AUTH_PRODUCT_REQUEST: '@auth/AUTH_PRODUCT_REQUEST',
  AUTH_PRODUCT_SUCCESS: '@auth/AUTH_PRODUCT_SUCCESS',
  AUTH_PRODUCT_FAILURE: '@auth/AUTH_PRODUCT_FAILURE',
  AUTH_PRODUCT_GUID_REQUEST: '@auth/AUTH_PRODUCT_GUID_REQUEST',
  AUTH_PRODUCT_EEM_REQUEST: '@auth/AUTH_PRODUCT_EEM_REQUEST'
}

describe('authProduct action creators should work properly', () => {
  it('should create an request action on preAuth', () => {
    const payload = {
      slug: 'string',
      name: 'string',
      url: 'string',
      tipoRenderizacao: 'string',
      subpath: 'string'
    }
    const expectedAction = {
      type: mockedTypes.AUTH_PRODUCT_REQUEST,
      payload
    }
    expect(preAuth(payload)).toEqual(expectedAction)
  })

  it('should create an specific request action on authProductRequest', () => {
    const payload = {
      slug: 'string',
      name: 'string',
      url: 'string',
      tipoRenderizacao: 'string',
      subpath: 'string'
    }
    const expectedAction = {
      type: mockedTypes.AUTH_PRODUCT_EEM_REQUEST,
      payload
    }
    expect(authProductRequest(payload, 'AUTH_PRODUCT_EEM_REQUEST')).toEqual(
      expectedAction
    )
  })

  it('should create an success action on authProductSuccess', () => {
    const expectedAction = {
      type: mockedTypes.AUTH_PRODUCT_SUCCESS,
      payload: {
        productData: { element_id: 'element_id', scripts: [] },
        productName: 'product_name',
        mcf: false
      }
    }
    expect(
      authProductSuccess({
        productData: { element_id: 'element_id', scripts: [] },
        productName: 'product_name',
        mcf: false
      })
    ).toEqual(expectedAction)
  })

  it('should create an failure action on authProductFailure', () => {
    const expectedAction = { type: mockedTypes.AUTH_PRODUCT_FAILURE }
    expect(authProductFailure()).toEqual(expectedAction)
  })
})
