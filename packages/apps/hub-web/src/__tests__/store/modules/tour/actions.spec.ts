import {
  getTourRequest,
  getTourSuccess,
  getTourFailure,
  getTourViewedRequest,
  getTourViewedSuccess,
  getTourViewedFailure,
  openTour,
  postTourViewed
} from '~/store/modules/tour/actions'

const mockedTypes = {
  GET_INFO_VIEWED_REQUEST: '@tour/GET_INFO_VIEWED_REQUEST',
  GET_INFO_VIEWED_SUCCESS: '@tour/GET_INFO_VIEWED_SUCCESS',
  GET_INFO_VIEWED_FAILURE: '@tour/GET_INFO_VIEWED_FAILURE',

  GET_TOUR_REQUEST: '@tour/GET_TOUR_REQUEST',
  GET_TOUR_SUCCESS: '@tour/GET_TOUR_SUCCESS',
  GET_TOUR_FAILURE: '@tour/GET_TOUR_FAILURE',

  OPEN_TOUR: '@tour/OPEN_TOUR',

  POST_TOUR: '@tour/POST_TOUR',

  SIGN_OUT: '@auth/SIGN_OUT'
}

const mockedTourSteps = [
  {
    selector: 'selector A',
    content: 'content A'
  },
  {
    selector: 'selector B',
    content: 'content B'
  },
  {
    selector: 'selector C',
    content: 'content C'
  },
  {
    selector: 'selector D',
    content: 'content D'
  }
]

describe('tour module action creators should work properly', () => {
  it('should get tour request with correct action type', () => {
    const expectedAction = { type: mockedTypes.GET_TOUR_REQUEST }
    expect(getTourRequest()).toEqual(expectedAction)
  })

  it('should dispatch tour success action with correct type and payload', () => {
    const expectedAction = {
      type: mockedTypes.GET_TOUR_SUCCESS,
      payload: mockedTourSteps
    }
    expect(getTourSuccess(mockedTourSteps)).toEqual(expectedAction)
  })

  it('should dispatch tour failure action with correct type', () => {
    const expectedAction = { type: mockedTypes.GET_TOUR_FAILURE }
    expect(getTourFailure()).toEqual(expectedAction)
  })

  it('should request if user has already seen the tour with correct action type', () => {
    const expectedAction = { type: mockedTypes.GET_INFO_VIEWED_REQUEST }
    expect(getTourViewedRequest()).toEqual(expectedAction)
  })

  it('should dispatch success action with correct payload on getTourViewedSuccess', () => {
    const expectedAction = {
      type: mockedTypes.GET_INFO_VIEWED_SUCCESS,
      payload: { viewed: true }
    }
    expect(getTourViewedSuccess({ viewed: true })).toEqual(expectedAction)
  })

  it('should dispatch failure action with correct payload on getTourViewedFailure', () => {
    const expectedAction = { type: mockedTypes.GET_INFO_VIEWED_FAILURE }
    expect(getTourViewedFailure()).toEqual(expectedAction)
  })

  it('should dispatch openTour action with correct payload and action type', () => {
    const expectedAction = {
      type: mockedTypes.OPEN_TOUR,
      payload: { open: true }
    }
    expect(openTour(true)).toEqual(expectedAction)
  })

  it('should dispatch postTour action with correct type', () => {
    const expectedAction = { type: mockedTypes.POST_TOUR }
    expect(postTourViewed()).toEqual(expectedAction)
  })
})
