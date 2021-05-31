import { Action } from 'redux'

import { StepsTour } from './types'

export const Actions = {
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

/*
  ?Buscar steps do tour
*/
export function getTourRequest(): Action {
  return {
    type: Actions.GET_TOUR_REQUEST
  }
}

export function getTourSuccess(data?: StepsTour[]): Action {
  return {
    type: Actions.GET_TOUR_SUCCESS,
    payload: data
  }
}

export function getTourFailure(): Action {
  return {
    type: Actions.GET_TOUR_FAILURE
  }
}

/*
  ?Busca saber se usuário ja viu o tour
*/
export function getTourViewedRequest(): Action {
  return {
    type: Actions.GET_INFO_VIEWED_REQUEST
  }
}

export function getTourViewedSuccess(data: { viewed: boolean }): Action {
  return {
    type: Actions.GET_INFO_VIEWED_SUCCESS,
    payload: data
  }
}

export function getTourViewedFailure(): Action {
  return {
    type: Actions.GET_INFO_VIEWED_FAILURE
  }
}

/*
  ?Abre o Tour
*/

export function openTour(open: boolean): Action {
  return {
    type: Actions.OPEN_TOUR,
    payload: { open }
  }
}

/*
  ?Envia tour para API
*/
export function postTourViewed(): Action {
  return {
    type: Actions.POST_TOUR
  }
}
