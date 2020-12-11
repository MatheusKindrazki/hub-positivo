import { Action } from 'redux'

export const Actions = {
  OPEN: '@tour/OPEN',

  GET_TOUR_REQUEST: '@tour/GET_TOUR_REQUEST',
  GET_TOUR_SUCCESS: '@tour/GET_TOUR_SUCCESS',
  GET_TOUR_FAILURE: '@tour/GET_TOUR_FAILURE',

  POST_TOUR_REQUEST: '@tour/POST_TOUR_REQUEST'
}

export function openTour(open: boolean): Action {
  return {
    type: Actions.OPEN,
    payload: open
  }
}

export function getTourRequest(): Action {
  return {
    type: Actions.GET_TOUR_REQUEST
  }
}

export function getTourSuccess(open: boolean): Action {
  return {
    type: Actions.GET_TOUR_SUCCESS,
    payload: open
  }
}

export function getTourFailure(): Action {
  return {
    type: Actions.GET_TOUR_FAILURE
  }
}

export function postTour(): Action {
  return {
    type: Actions.POST_TOUR_REQUEST
  }
}
