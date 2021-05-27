import category, { INITIAL_STATE } from '~/store/modules/category/reducer'
import {
  categoryGetAllRequest,
  categoryGetAllSuccess,
  categoryGetAllFailure
} from '~/store/modules/category/actions'

describe('category reducer', () => {
  it('returns the initial state when an action type is not passed', () => {
    const result = category(undefined, { type: null })
    expect(result).toEqual(INITIAL_STATE)
  })

  it('should return change loading to true when a product is requested', () => {
    expect(category(INITIAL_STATE, categoryGetAllRequest())).toEqual({
      loading: true,
      categories: []
    })
  })

  it('loading is set to false on success action', () => {
    const payload = [
      {
        id: 'string',
        nome: 'string',
        cor: 'string',
        ativo: false
      },
      {
        id: 'string',
        nome: 'string',
        cor: 'string',
        ativo: false
      }
    ]
    const result = category(INITIAL_STATE, categoryGetAllSuccess(payload))
    expect(result).toEqual({ loading: false, categories: payload })
  })

  it('loading is set to false on failure action', () => {
    const result = category(INITIAL_STATE, categoryGetAllFailure())
    expect(result).toEqual({ loading: false })
  })
})
