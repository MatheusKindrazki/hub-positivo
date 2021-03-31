import tour, {
  INITIAL_STATE as initialState
} from '~/store/modules/tour/reducer'
import {
  getTourSuccess,
  getTourViewedRequest,
  getTourViewedSuccess,
  getTourViewedFailure,
  openTour
} from '~/store/modules/tour/actions'
import { signOut } from '~/store/modules/auth/actions'

jest.mock('~/services/mixpanel/clearAll')
jest.mock('~/hooks/amplitude/clearAll')

describe('tour reducer should work properly', () => {
  it('returns the initial state when an action type is not passed', () => {
    const result = tour(undefined, { type: null })
    expect(result).toEqual(initialState)
  })

  it('loading is set to true on get tour viewed action', () => {
    const result = tour(initialState, getTourViewedRequest())
    expect(result).toEqual({ ...initialState, loading: true })
  })

  it('should set loading and tour info on getTourViewedSuccess action', () => {
    const result = tour(initialState, getTourViewedSuccess({ viewed: true }))
    const expectedOutput = {
      loading: false,
      viewedLoaded: true,
      open: false,
      viewed: true
    }
    expect(result).toEqual(expectedOutput)
  })

  it('loading is set to false on getTourViewedFailure action', () => {
    const result = tour(initialState, getTourViewedFailure())
    expect(result).toEqual({ ...initialState, loading: false })
  })

  it('should set open to true on openTour action with truthy payload', () => {
    const result = tour(initialState, openTour(true))
    expect(result).toEqual({ ...initialState, open: true })
  })

  it('should reset tour info on sign out', () => {
    const result = tour(initialState, signOut())
    const resetInfo = {
      loading: false,
      open: false,
      viewed: false,
      viewedLoaded: false,
      steps: undefined
    }
    expect(result).toEqual(resetInfo)
  })

  it('should set tour info on successful getTour action', () => {
    const mockedTourSteps = [
      {
        selector: 'selector A',
        content: 'content A'
      }
    ]
    const result = tour(initialState, getTourSuccess(mockedTourSteps))
    expect(result).toEqual({ ...initialState, steps: mockedTourSteps })
  })
})
