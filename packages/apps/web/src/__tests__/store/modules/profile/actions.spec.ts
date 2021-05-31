import { setProfile, profiles } from '~/store/modules/profile/actions'

import mockedProfiles from '~/__mocks__/store/profiles.mock.json'

const mockedTypes = {
  SET_PROFILE: '@profiles/SET',
  PROFILES: '@profiles/PROFILES'
}

describe('profile module action creators should work properly', () => {
  it('should set profile with the correct payload', () => {
    const expectedAction = {
      type: mockedTypes.SET_PROFILE,
      payload: mockedProfiles
    }
    expect(setProfile(mockedProfiles)).toEqual(expectedAction)
  })

  it('should set profiles with the correct payload', () => {
    const expectedAction = {
      type: mockedTypes.PROFILES,
      payload: mockedProfiles.profiles
    }
    expect(profiles(mockedProfiles.profiles)).toEqual(expectedAction)
  })
})
