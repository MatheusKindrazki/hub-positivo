import { Action } from 'redux'

export const Actions = {
  SAE_ARVORE_INTEGRATION: '@integration/SAE_ARVORE_INTEGRATION',

  UNIQUE_TOKEN_PER_SCHOOL_EEM: '@integration/UNIQUE_TOKEN_PER_SCHOOL_EEM'
}

export function mhundArvoreIntegration(): Action {
  return {
    type: Actions.SAE_ARVORE_INTEGRATION
  }
}

export function uniqueTokenPerSchoolEEM(): Action {
  return {
    type: Actions.UNIQUE_TOKEN_PER_SCHOOL_EEM
  }
}
