import { Action } from 'redux'

export const Actions = {
  GET_INFO_VIEWED_REQUEST: '@tour/GET_INFO_VIEWED_REQUEST',
  GET_INFO_VIEWED_SUCCESS: '@tour/GET_INFO_VIEWED_SUCCESS',
  GET_INFO_VIEWED_FAILURE: '@tour/GET_INFO_VIEWED_FAILURE',

  OPEN_TOUR: '@tour/OPEN_TOUR',

  POST_TOUR: '@tour/POST_TOUR'
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
