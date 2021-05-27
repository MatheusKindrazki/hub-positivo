import category, { INITIAL_STATE } from '~/store/modules/solutions/reducer'
import {
  solutionsGetRequest,
  solutionsGetSuccess,
  solutionsGetFailure,
  solutionGetExcludedRequest,
  solutionGetExcludedSuccess,
  solutionGetExcludedFailure
} from '~/store/modules/solutions/actions'

import { categoriesApiReturnData } from '~/__mocks__/store'

describe('solutions reducer', () => {
  it('returns the initial state when an action type is not passed', () => {
    const result = category(undefined, { type: null })
    expect(result).toEqual(INITIAL_STATE)
  })

  it('should change loading to true when solutions are requested', () => {
    expect(category(INITIAL_STATE, solutionsGetRequest())).toEqual({
      loading: true
    })
  })

  it('loading is set to false and data undefined on failure action', () => {
    const result = category(INITIAL_STATE, solutionsGetFailure())
    expect(result).toEqual({ loading: false, publicadas: undefined })
  })

  it('loading is set to false on success action', () => {
    const result = category(
      INITIAL_STATE,
      solutionsGetSuccess(categoriesApiReturnData)
    )
    expect(result).toEqual({
      loading: false,
      publicadas: categoriesApiReturnData
    })
  })

  it('should change loading to true and reset data when categories are requested', () => {
    expect(category(INITIAL_STATE, solutionGetExcludedRequest())).toEqual({
      loading: true,
      excluidas: undefined,
      publicadas: undefined
    })
  })

  it('loading is set to false and data reseted on failure action', () => {
    const result = category(INITIAL_STATE, solutionGetExcludedFailure())
    expect(result).toEqual({
      loading: false,
      excluidas: undefined,
      publicadas: undefined
    })
  })

  it('loading is set to false on success action', () => {
    const result = category(
      INITIAL_STATE,
      solutionGetExcludedSuccess(categoriesApiReturnData)
    )
    expect(result).toEqual({
      loading: false,
      excluidas: categoriesApiReturnData
    })
  })
})
