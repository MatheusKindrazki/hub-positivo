import {
  preAuth,
  authProductRequest,
  authProductSuccess,
  authProductFailure,
  Actions
} from '~/store/modules/authProduct/actions'

describe('authProduct action creators should work properly', () => {
  it('should create an request action on preAuth', () => {
    const payload = {
      product: 'string',
      name: 'string',
      url: 'string',
      tipoRenderizacao: 'string',
      subpath: 'string'
    }
    const expectedAction = {
      type: Actions.AUTH_PRODUCT_REQUEST,
      payload
    }
    expect(preAuth(payload)).toEqual(expectedAction)
  })

  it('should create an specific request action on authProductRequest', () => {
    const payload = {
      product: 'string',
      name: 'string',
      url: 'string',
      tipoRenderizacao: 'string',
      subpath: 'string'
    }
    const expectedAction = {
      type: Actions.AUTH_PRODUCT_EEM_REQUEST,
      payload
    }
    expect(authProductRequest(payload, 'AUTH_PRODUCT_EEM_REQUEST')).toEqual(
      expectedAction
    )
  })

  it('should create an success action on authProductSuccess', () => {
    const expectedAction = { type: Actions.AUTH_PRODUCT_SUCCESS }
    expect(authProductSuccess()).toEqual(expectedAction)
  })

  it('should create an failure action on authProductFailure', () => {
    const expectedAction = { type: Actions.AUTH_PRODUCT_FAILURE }
    expect(authProductFailure()).toEqual(expectedAction)
  })
})
