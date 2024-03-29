import authProduct, { INITIAL_STATE } from '~/store/modules/authProduct/reducer'
import {
  preAuth,
  authProductSuccess,
  authProductFailure
} from '~/store/modules/authProduct/actions'

describe('authProduct reducer', () => {
  it('returns the initial state when an action type is not passed', () => {
    const result = authProduct(undefined, { type: null })
    expect(result).toEqual(INITIAL_STATE)
  })

  it('should return change loading to true when a product is requested', () => {
    const payload = {
      slug: 'string',
      name: 'string',
      url: 'string'
    }
    expect(authProduct(INITIAL_STATE, preAuth(payload))).toEqual({
      loading: true,
      mcf: false,
      productData: null,
      productName: null
    })
  })

  it('loading is set to false on success action', () => {
    const result = authProduct(
      INITIAL_STATE,
      authProductSuccess({
        productData: { element_id: 'element_id', scripts: [] },
        productName: 'product_name',
        mcf: false
      })
    )
    expect(result).toEqual({
      loading: false,
      mcf: false,
      productData: {
        element_id: 'element_id',
        scripts: []
      },
      productName: 'product_name'
    })
  })

  it('loading is set to false on failure action', () => {
    const result = authProduct(INITIAL_STATE, authProductFailure())
    expect(result).toEqual({
      loading: false,
      mcf: false,
      productData: null,
      productName: null
    })
  })
})
