import { produce } from 'immer'

import { Reducer } from 'redux'

import { SolutionReducer } from './types'
import { Actions } from './actions'

export const INITIAL_STATE: SolutionReducer = {
  loading: true,
  solution: null
}

type ReturnReducer = Reducer<SolutionReducer>

const individualSolution: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SOLUTION_GET_REQUEST: {
        draft.loading = true
        break
      }
      case Actions.SOLUTION_GET_SUCCESS: {
        draft.loading = false
        draft.solution = action.payload.solution
        break
      }
      case Actions.SOLUTION_GET_FAILURE: {
        draft.loading = false
        break
      }
      default:
    }
  })
}

export default individualSolution
