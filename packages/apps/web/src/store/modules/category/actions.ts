import { Action } from 'redux'

import { Category, CategoryPostData } from './types'

export const Actions = {
  CATEGORY_POST_REQUEST: '@category/CATEGORY_POST_REQUEST',
  CATEGORY_POST_SUCCESS: '@category/CATEGORY_POST_SUCCESS',
  CATEGORY_POST_FAILURE: '@category/CATEGORY_POST_FAILURE',
  CATEGORY_GETALL_REQUEST: '@category/CATEGORY_GETALL_REQUEST',
  CATEGORY_GETALL_SUCCESS: '@category/CATEGORY_GETALL_SUCCESS',
  CATEGORY_GETALL_FAILURE: '@category/CATEGORY_GETALL_FAILURE'
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

export function categoryGetAllRequest(): Action {
  return {
    type: Actions.CATEGORY_GETALL_REQUEST
  }
}

export function categoryGetAllFailure(): Action {
  return {
    type: Actions.CATEGORY_GETALL_FAILURE
  }
}

export function categoryGetAllSuccess(categories: Category[]): Action {
  return {
    type: Actions.CATEGORY_GETALL_SUCCESS,
    payload: categories
  }
}
