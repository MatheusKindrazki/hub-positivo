import { produce } from 'immer'

import { Reducer } from 'redux'

import { SolutionsReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: SolutionsReducer = {
  loading: true,
  publicadas: undefined,
  excluidas: undefined
}

type ReturnReducer = Reducer<SolutionsReducer>

const solutions: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SOLUTIONS_GET_REQUEST: {
        draft.loading = true
        break
      }

      case Actions.SOLUTIONS_GET_SUCCESS: {
        draft.loading = false
        draft.publicadas = action.payload
        break
      }

      case Actions.SOLUTIONS_GET_FAILURE: {
        draft.loading = false
        draft.publicadas = undefined
        break
      }
      case Actions.SOLUTIONS_GET_EXCLUDED_REQUEST: {
        draft.loading = true
        break
      }

      case Actions.SOLUTIONS_GET_EXCLUDED_SUCCESS: {
        draft.loading = false
        draft.excluidas = action.payload
        break
      }

      case Actions.SOLUTIONS_GET_EXCLUDED_FAILURE: {
        draft.loading = false
        draft.excluidas = undefined
        break
      }
      default:
    }
  })
}

export default solutions
