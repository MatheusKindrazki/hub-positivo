import authProduct from '~/store/modules/authProduct/reducer'
import { INITIAL_STATE as initialState } from '~/store/modules/authProduct/reducer'
import {
  preAuth,
  authProductSuccess,
  authProductFailure
} from '~/store/modules/authProduct/actions'

describe('authProduct reducer', () => {
  it('returns the initial state when an action type is not passed', () => {
    const result = authProduct(undefined, { type: null })
    expect(result).toEqual(initialState)
  })

  it('should return change loading to true when a product is requested', () => {
    const payload = {
      product: 'string',
      name: 'string',
      url: 'string'
    }
    expect(authProduct(initialState, preAuth(payload))).toEqual({
      loading: true
    })
  })

  it('loading is set to false on success action', () => {
    const result = authProduct(initialState, authProductSuccess())
    expect(result).toEqual({ loading: false })
  })

  it('loading is set to false on failure action', () => {
    const result = authProduct(initialState, authProductFailure())
    expect(result).toEqual({ loading: false })
  })
})
