import { Action } from 'redux'

export const Actions = {
  SAE_ARVORE_INTEGRATION: '@integration/SAE_ARVORE_INTEGRATION'
}

export function mhundArvoreIntegration(): Action {
  return {
    type: Actions.SAE_ARVORE_INTEGRATION
  }
}
