import profile, { INITIAL_STATE } from '~/store/modules/profile/reducer'
import { setProfile, profiles } from '~/store/modules/profile/actions'
import { signOut } from '~/store/modules/auth/actions'

import mockedProfiles from '~/__mocks__/store/profiles.mock.json'

jest.mock('~/services/mixpanel/clearAll')

jest.mock('~/hooks/amplitude/clearAll')

const setProfileExpectedOutput = {
  colorProfile: 'professor',
  guid: 'PROFESSOR',
  icon: undefined,
  name: 'Professor',
  profile: 'professor'
}

const profilesExpectedOutput = {
  guid: 'default',
  name: 'Default',
  profile: 'default',
  profiles: [
    {
      colorProfile: 'administrador',
      icon: 'administrador',
      id: 'ADMINISTRADOR',
      label: 'Administrador',
      name: 'Administrador',
      value: 'administrador'
    },
    {
      colorProfile: 'coordenador',
      icon: 'coordenador',
      id: 'COORDENADOR',
      label: 'Coordenador',
      name: 'Coordenador',
      value: 'coordenador'
    },
    {
      colorProfile: 'família',
      icon: 'família',
      id: 'PAIS_E_RESPONSAVEIS',
      label: 'Família',
      name: 'Família',
      value: 'família'
    },
    {
      colorProfile: 'professor',
      icon: 'professor',
      id: 'PROFESSOR',
      label: 'Professor',
      name: 'Professor',
      value: 'professor'
    }
  ]
}

const expectedSignOutOutput = {
  colorProfile: 'default',
  guid: 'default',
  icon: 'default',
  name: 'Default',
  profile: 'default'
}

describe('authProduct reducer', () => {
  it('returns the initial state when an action type is not passed', () => {
    const result = profile(undefined, { type: null })
    expect(result).toEqual(INITIAL_STATE)
  })

  it('loading is set to false on failure action', () => {
    const result = profile(INITIAL_STATE, setProfile(mockedProfiles))
    expect(result).toEqual(setProfileExpectedOutput)
  })

  it('loading is set to false on failure action', () => {
    const result = profile(INITIAL_STATE, profiles(mockedProfiles.profiles))
    expect(result).toEqual(profilesExpectedOutput)
  })

  it('loading is set to false on failure action', () => {
    const result = profile(INITIAL_STATE, signOut())
    expect(result).toEqual(expectedSignOutOutput)
  })
})
