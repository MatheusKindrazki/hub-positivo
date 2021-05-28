import permissions, { INITIAL_STATE } from '~/store/modules/permissions/reducer'
import {
  getAllProfilePermissionsRequest,
  getAllProfilePermissionsFailure,
  getAllProfilePermissionsSuccess,
  profilePermissionsBySolutionRequest,
  profilePermissionsBySolutionFailure,
  profilePermissionsBySolutionSuccess,
  schoolPermissionsBySolutionRequest,
  schoolPermissionsBySolutionFailure,
  schoolPermissionsBySolutionSuccess
} from '~/store/modules/permissions/actions'

describe('solutions reducer', () => {
  it('returns the initial state when an action type is not passed', () => {
    const result = permissions(undefined, { type: null })
    expect(result).toEqual(INITIAL_STATE)
  })

  it('should change loading to true when solutions are requested', () => {
    expect(
      permissions(INITIAL_STATE, getAllProfilePermissionsRequest())
    ).toEqual({
      loading: true
    })
  })

  it('loading is set to false and data undefined on failure action', () => {
    const result = permissions(INITIAL_STATE, getAllProfilePermissionsFailure())
    expect(result).toEqual({ loading: false, publicadas: undefined })
  })

  it('loading is set to false on success action', () => {
    const result = permissions(INITIAL_STATE, getAllProfilePermissionsSuccess())
    expect(result).toEqual({
      loading: false
    })
  })

  it('should change loading to true and reset data when categories are requested', () => {
    expect(
      permissions(INITIAL_STATE, profilePermissionsBySolutionRequest())
    ).toEqual({
      loading: true,
      excluidas: undefined,
      publicadas: undefined
    })
  })

  it('loading is set to false and data reseted on failure action', () => {
    const result = permissions(
      INITIAL_STATE,
      profilePermissionsBySolutionFailure()
    )
    expect(result).toEqual({
      loading: false,
      excluidas: undefined,
      publicadas: undefined
    })
  })

  it('loading is set to false on success action', () => {
    const result = permissions(
      INITIAL_STATE,
      profilePermissionsBySolutionSuccess()
    )
    expect(result).toEqual({
      loading: false
    })
  })

  it('should change loading to true and reset data when categories are requested', () => {
    expect(
      permissions(INITIAL_STATE, schoolPermissionsBySolutionRequest())
    ).toEqual({
      loading: true,
      excluidas: undefined,
      publicadas: undefined
    })
  })

  it('loading is set to false and data reseted on failure action', () => {
    const result = permissions(
      INITIAL_STATE,
      schoolPermissionsBySolutionFailure()
    )
    expect(result).toEqual({
      loading: false,
      excluidas: undefined,
      publicadas: undefined
    })
  })

  it('loading is set to false on success action', () => {
    const result = permissions(
      INITIAL_STATE,
      schoolPermissionsBySolutionSuccess()
    )
    expect(result).toEqual({
      loading: false
    })
  })
})
