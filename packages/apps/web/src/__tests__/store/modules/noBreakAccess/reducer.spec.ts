import noBreak, { INITIAL_STATE } from '~/store/modules/noBreakAccess/reducer'
import {
  noBreakAccessDisable,
  noBreakAccessEnable
} from '~/store/modules/noBreakAccess/actions'

describe('noBreakAccess reducer', () => {
  const mockedPayload = {
    user_login: 'test-user'
  }
  it('returns the initial state when an action type is not passed', () => {
    const result = noBreak(undefined, { type: null })
    expect(result).toEqual(INITIAL_STATE)
  })

  it('should change loading to true and reset data when noBreaks are requested', () => {
    expect(noBreak(INITIAL_STATE, noBreakAccessEnable(mockedPayload))).toEqual({
      nobreak: true,
      user_login: mockedPayload.user_login
    })
  })

  it('loading is set to false and data reseted on failure action', () => {
    const result = noBreak(INITIAL_STATE, noBreakAccessDisable(mockedPayload))
    expect(result).toEqual({ nobreak: false, user_login: undefined })
  })
})
