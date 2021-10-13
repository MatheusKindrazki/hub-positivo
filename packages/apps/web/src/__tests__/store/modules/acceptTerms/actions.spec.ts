import {
  checkTermsRequest,
  checkTermsFailure,
  checkTermsSuccess,
  acceptTermsRequest,
  acceptTermsSuccess,
  acceptTermsFailure
} from '~/store/modules/acceptTerms/actions'

const mockedTypes = {
  TERMS_REQUEST: '@acceptTerms/TERMS_REQUEST',
  TERMS_SUCCESS: '@acceptTerms/TERMS_SUCCESS',
  TERMS_FAILURE: '@acceptTerms/TERMS_FAILURE',

  CHECK_TERMS_REQUEST: '@acceptTerms/CHECK_TERMS_REQUEST',
  CHECK_TERMS_SUCCESS: '@acceptTerms/CHECK_TERMS_SUCCESS',
  CHECK_TERMS_FAILURE: '@acceptTerms/CHECK_TERMS_FAILURE'
}
describe('categoryPost actions should have correct types and payloads', () => {
  it('should create a request action with correct permissions on checkTermsRequest', () => {
    const expectedAction = {
      type: mockedTypes.CHECK_TERMS_REQUEST
    }
    expect(checkTermsRequest()).toEqual(expectedAction)
  })
  it('should create a success action with correct type on categoryPostSuccess', () => {
    const checking = false

    const expectedAction = {
      type: mockedTypes.CHECK_TERMS_SUCCESS,
      payload: checking
    }
    expect(checkTermsSuccess(checking)).toEqual(expectedAction)
  })
  it('should create a failure action with correct type on categoryPostFailure', () => {
    const expectedAction = {
      type: mockedTypes.CHECK_TERMS_FAILURE
    }
    expect(checkTermsFailure()).toEqual(expectedAction)
  })

  it('should create a request action with correct type', () => {
    const expectedAction = {
      type: mockedTypes.TERMS_REQUEST
    }
    expect(acceptTermsRequest()).toEqual(expectedAction)
  })
  it('should create a success action with correct type on categoryGetAllSuccess', () => {
    const expectedAction = {
      type: mockedTypes.TERMS_SUCCESS
    }
    expect(acceptTermsSuccess()).toEqual(expectedAction)
  })
  it('should create a failure action with correct type on categoryGetAllFailure', () => {
    const expectedAction = {
      type: mockedTypes.TERMS_FAILURE
    }
    expect(acceptTermsFailure()).toEqual(expectedAction)
  })
})
