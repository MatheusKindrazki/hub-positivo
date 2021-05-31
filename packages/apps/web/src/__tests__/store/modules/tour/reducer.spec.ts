import tour, { INITIAL_STATE } from '~/store/modules/tour/reducer'
import {
  getTourSuccess,
  getTourViewedRequest,
  getTourViewedSuccess,
  getTourViewedFailure,
  openTour
} from '~/store/modules/tour/actions'
import { signOut } from '~/store/modules/auth/actions'

jest.mock('~/services/mixpanel/clearAll')

describe('tour reducer should work properly', () => {
  it('returns the initial state when an action type is not passed', () => {
    const result = tour(undefined, { type: null })
    expect(result).toEqual(INITIAL_STATE)
  })

  it('loading is set to true on get tour viewed action', () => {
    const result = tour(INITIAL_STATE, getTourViewedRequest())
    expect(result).toEqual({ ...INITIAL_STATE, loading: true })
  })

  it('should set loading and tour info on getTourViewedSuccess action', () => {
    const result = tour(INITIAL_STATE, getTourViewedSuccess({ viewed: true }))
    const expectedOutput = {
      loading: false,
      viewedLoaded: true,
      open: false,
      viewed: true
    }
    expect(result).toEqual(expectedOutput)
  })

  it('loading is set to false on getTourViewedFailure action', () => {
    const result = tour(INITIAL_STATE, getTourViewedFailure())
    expect(result).toEqual({ ...INITIAL_STATE, loading: false })
  })

  it('should set open to true on openTour action with truthy payload', () => {
    const result = tour(INITIAL_STATE, openTour(true))
    expect(result).toEqual({ ...INITIAL_STATE, open: true })
  })

  it('should reset tour info on sign out', () => {
    const result = tour(INITIAL_STATE, signOut())
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
    const result = tour(INITIAL_STATE, getTourSuccess(mockedTourSteps))
    expect(result).toEqual({ ...INITIAL_STATE, steps: mockedTourSteps })
  })
})
