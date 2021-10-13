import acceptTerms, { INITIAL_STATE } from '~/store/modules/acceptTerms/reducer'
import {
  acceptTermsRequest,
  acceptTermsSuccess,
  acceptTermsFailure,
  checkTermsSuccess
} from '~/store/modules/acceptTerms/actions'

describe('acceptTerms reducer', () => {
  it('returns the initial state when an action type is not passed', () => {
    const result = acceptTerms(undefined, { type: null })
    expect(result).toEqual(INITIAL_STATE)
  })

  it('should change loading to true when accept terms are requested', () => {
    expect(acceptTerms(INITIAL_STATE, acceptTermsRequest())).toEqual({
      loading: true,
      accepted: false,
      firstCall: false,
      checking: false
    })
  })

  it('loading is set to false on acceptTermsFailure action and accepted/checking is set to true even on api failure', () => {
    const result = acceptTerms(INITIAL_STATE, acceptTermsFailure())
    expect(result).toEqual({
      loading: false,
      accepted: true,
      checking: true,
      firstCall: false
    })
  })

  it('accepted and checking is set to true on acceptTermsSuccess action', () => {
    const result = acceptTerms(INITIAL_STATE, acceptTermsSuccess())
    expect(result).toEqual({
      loading: false,
      accepted: true,
      checking: true,
      firstCall: false
    })
  })

  it('accepted, checking and firstCall is set to true on checkTermsSuccess action', () => {
    const result = acceptTerms(INITIAL_STATE, checkTermsSuccess(true))
    expect(result).toEqual({
      loading: false,
      firstCall: true,
      checking: true,
      accepted: true
    })
  })
})
