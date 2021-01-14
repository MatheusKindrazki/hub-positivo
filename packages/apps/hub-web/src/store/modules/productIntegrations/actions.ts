import { Action } from 'redux'

export const Actions = {
  PRODUCT_SUCCESS: '@products/PRODUCT_SUCCESS',
  PRODUCT_REQUEST: '@products/PRODUCT_REQUEST',

  SAE_ARVORE_INTEGRATION: '@integration/SAE_ARVORE_INTEGRATION'
}

export function mhundArvoreIntegration(): Action {
  return {
    type: Actions.SAE_ARVORE_INTEGRATION
  }
}
