import { setProfile, profiles } from '~/store/modules/profile/actions'

import mockedProfiles from '~/__mocks__/store/profiles.mock.json'

const mockedTypes = {
  SET_PROFILE: '@profiles/SET',
  PROFILES: '@profiles/PROFILES'
}

describe('authProduct action creators should work properly', () => {
  it('should create an success action on authProductSuccess', () => {
    const expectedAction = {
      type: mockedTypes.SET_PROFILE,
      payload: mockedProfiles
    }
    expect(setProfile(mockedProfiles)).toEqual(expectedAction)
  })

  it('should create an failure action on authProductFailure', () => {
    const expectedAction = {
      type: mockedTypes.PROFILES,
      payload: mockedProfiles.profiles
    }
    expect(profiles(mockedProfiles.profiles)).toEqual(expectedAction)
  })
})
