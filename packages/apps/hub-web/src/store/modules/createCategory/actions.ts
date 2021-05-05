import { Action } from 'redux'

import { CategoryPostData } from './types'

export const Actions = {
  CATEGORY_POST_REQUEST: '@category/CATEGORY_POST_REQUEST',
  CATEGORY_POST_SUCCESS: '@category/CATEGORY_POST_SUCCESS',
  CATEGORY_POST_FAILURE: '@category/CATEGORY_POST_FAILURE'
}

export function categoryPostRequest(data: CategoryPostData): Action {
  return {
    type: Actions.CATEGORY_POST_REQUEST,
    payload: data
  }
}

export function categoryPostFailure(): Action {
  return {
    type: Actions.CATEGORY_POST_FAILURE
  }
}

export function categoryPostSuccess(): Action {
  return {
    type: Actions.CATEGORY_POST_SUCCESS
  }
}
