import { Action } from 'redux'

import { Profile, Profiles } from './types'

export const Actions = {
  SET_PROFILE: '@profiles/SET',

  PROFILES: '@profiles/PROFILES'
}

export function setProfile(data: Profile): Action {
  return {
    type: Actions.SET_PROFILE,
    payload: data
  }
}

export function profiles(data: Profiles): Action {
  return {
    type: Actions.PROFILES,
    payload: data
  }
}
