import { Action } from 'redux'

import {
  Category,
  PostSolutionPayload,
  PutSolutionData,
  GetExcludedSolutionsResponse
} from './types'

export const Actions = {
  SOLUTION_POST_REQUEST: '@solution/SOLUTION_POST_REQUEST',
  SOLUTION_POST_SUCCESS: '@solution/SOLUTION_POST_SUCCESS',
  SOLUTION_POST_FAILURE: '@solution/SOLUTION_POST_FAILURE',

  SOLUTIONS_GET_REQUEST: '@solutions/SOLUTIONS_REQUEST',
  SOLUTIONS_GET_SUCCESS: '@solutions/SOLUTIONS_SUCCESS',
  SOLUTIONS_GET_FAILURE: '@solutions/SOLUTIONS_FAILURE',

  SOLUTIONS_GET_EXCLUDED_REQUEST: '@solutions/SOLUTIONS_GET_EXCLUDED_REQUEST',
  SOLUTIONS_GET_EXCLUDED_SUCCESS: '@solutions/SOLUTIONS_GET_EXCLUDED_SUCCESS',
  SOLUTIONS_GET_EXCLUDED_FAILURE: '@solutions/SOLUTIONS_GET_EXCLUDED_FAILURE',

  SOLUTION_PUT_REQUEST: '@solution/SOLUTION_PUT_REQUEST',
  SOLUTION_PUT_SUCCESS: '@solution/SOLUTION_PUT_SUCCESS',
  SOLUTION_PUT_FAILURE: '@solution/SOLUTION_PUT_FAILURE',

  SOLUTION_DELETE_REQUEST: '@solution/SOLUTION_DELETE_REQUEST',
  SOLUTION_DELETE_SUCCESS: '@solution/SOLUTION_DELETE_SUCCESS',
  SOLUTION_DELETE_FAILURE: '@solution/SOLUTION_DELETE_FAILURE',

  SOLUTION_RESTAURE_REQUEST: '@solution/SOLUTION_RESTAURE_REQUEST',
  SOLUTION_RESTAURE_SUCCESS: '@solution/SOLUTION_RESTAURE_SUCCESS',
  SOLUTION_RESTAURE_FAILURE: '@solution/SOLUTION_RESTAURE_FAILURE'
}

/*
  ? Criar solucao individualmente
*/

export function solutionPostRequest(solution: PostSolutionPayload): Action {
  return {
    type: Actions.SOLUTION_POST_REQUEST,
    payload: {
      solution
    }
  }
}

export function solutionPostFailure(): Action {
  return {
    type: Actions.SOLUTION_POST_FAILURE
  }
}

export function solutionPostSuccess(): Action {
  return {
    type: Actions.SOLUTION_POST_SUCCESS
  }
}

/*
  ? Buscando todas as categorias e soluções
*/

export function solutionsGetRequest(): Action {
  return {
    type: Actions.SOLUTIONS_GET_REQUEST
  }
}

export function solutionsGetFailure(): Action {
  return {
    type: Actions.SOLUTIONS_GET_FAILURE
  }
}

export function solutionsGetSuccess(data?: Category[]): Action {
  return {
    type: Actions.SOLUTIONS_GET_SUCCESS,
    payload: data
  }
}

/*
  ? Deletar solucao individualmente
*/

export function solutionDeleteRequest(id: string): Action {
  return {
    type: Actions.SOLUTION_DELETE_REQUEST,
    payload: {
      id
    }
  }
}

export function solutionDeleteFailure(): Action {
  return {
    type: Actions.SOLUTION_DELETE_FAILURE
  }
}

export function solutionDeleteSuccess(): Action {
  return {
    type: Actions.SOLUTION_DELETE_SUCCESS
  }
}

/*
  ? Restaurar da lixeira uma solução
*/

export function solutionRestaureRequest(id: string): Action {
  return {
    type: Actions.SOLUTION_RESTAURE_REQUEST,
    payload: {
      id
    }
  }
}

export function solutionRestaureFailure(): Action {
  return {
    type: Actions.SOLUTION_RESTAURE_FAILURE
  }
}

export function solutionRestaureSuccess(): Action {
  return {
    type: Actions.SOLUTION_RESTAURE_SUCCESS
  }
}

/*
  ? Atualizar solucao individualmente
*/

export function solutionPutRequest(data: PutSolutionData): Action {
  return {
    type: Actions.SOLUTION_PUT_REQUEST,
    payload: data
  }
}

export function solutionPutFailure(): Action {
  return {
    type: Actions.SOLUTION_PUT_FAILURE
  }
}

export function solutionPutSuccess(): Action {
  return {
    type: Actions.SOLUTION_PUT_SUCCESS
  }
}

/*
  ? Solicitar soluções excluídas
*/

export function solutionsGetExcludedRequest(): Action {
  return {
    type: Actions.SOLUTIONS_GET_EXCLUDED_REQUEST
  }
}

export function solutionsGetExcludedFailure(): Action {
  return {
    type: Actions.SOLUTIONS_GET_EXCLUDED_FAILURE
  }
}

export function solutionsGetExcludedSuccess(
  data: GetExcludedSolutionsResponse
): Action {
  return {
    type: Actions.SOLUTIONS_GET_EXCLUDED_SUCCESS,
    payload: data
  }
}
