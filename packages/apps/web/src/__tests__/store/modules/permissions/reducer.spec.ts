import { Restricao } from '~/store/modules/permissions/types'
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

describe('permissions reducer', () => {
  it('returns the initial state when an action type is not passed', () => {
    const result = permissions(undefined, { type: null })
    expect(result).toEqual(INITIAL_STATE)
  })

  it('should change loading to true when permissions are requested', () => {
    expect(
      permissions(INITIAL_STATE, getAllProfilePermissionsRequest())
    ).toEqual({
      loading: true,
      profileOptions: [],
      profilePermissions: [],
      schoolPermissions: []
    })
  })

  it('loading is set to false on failure action', () => {
    const result = permissions(INITIAL_STATE, getAllProfilePermissionsFailure())
    expect(result).toEqual({
      loading: false,
      profileOptions: [],
      profilePermissions: [],
      schoolPermissions: []
    })
  })

  it('loading is set to false, and profileOptions are set on get all permissions success action', () => {
    const payload = [
      {
        perfil: 'Professor',
        nivelEnsino: 'EF1',
        id: 'fake id'
      },
      {
        perfil: 'Administrador',
        nivelEnsino: null,
        id: 'fake id'
      }
    ]
    const result = permissions(
      INITIAL_STATE,
      getAllProfilePermissionsSuccess(payload)
    )
    expect(result).toEqual({
      loading: false,
      profileOptions: payload,
      profilePermissions: [],
      schoolPermissions: []
    })
  })

  it('should change loading to true when profile permissions are requested', () => {
    const solutionId = 'fake id'
    expect(
      permissions(
        INITIAL_STATE,
        profilePermissionsBySolutionRequest(solutionId)
      )
    ).toEqual({
      loading: true,
      profilePermissions: [],
      profileOptions: [],
      schoolPermissions: []
    })
  })

  it('loading is set to false on failure action', () => {
    const result = permissions(
      INITIAL_STATE,
      profilePermissionsBySolutionFailure()
    )
    expect(result).toEqual({
      loading: false,
      profileOptions: [],
      profilePermissions: [],
      schoolPermissions: []
    })
  })

  it('loading is set to false and profilePermissions are set on success action', () => {
    const payload = [
      {
        id: 'fake id',
        idSolucao: 'fake id',
        idPerfilNivelEnsino: 'fake id'
      },
      {
        id: 'fake id',
        idSolucao: 'fake id',
        idPerfilNivelEnsino: 'fake id'
      }
    ]
    const result = permissions(
      INITIAL_STATE,
      profilePermissionsBySolutionSuccess(payload)
    )
    expect(result).toEqual({
      loading: false,
      profilePermissions: payload,
      profileOptions: [],
      schoolPermissions: []
    })
  })

  it('should change loading to true when school permissions are requested', () => {
    const solutionId = 'fake id'
    expect(
      permissions(INITIAL_STATE, schoolPermissionsBySolutionRequest(solutionId))
    ).toEqual({
      loading: true,
      schoolPermissions: [],
      profileOptions: [],
      profilePermissions: []
    })
  })

  it('loading is set to false on failure action', () => {
    const result = permissions(
      INITIAL_STATE,
      schoolPermissionsBySolutionFailure()
    )
    expect(result).toEqual({
      loading: false,
      profileOptions: [],
      profilePermissions: [],
      schoolPermissions: []
    })
  })

  it('loading is set to false and school permissions are set on success action', () => {
    const payload = [
      {
        id: 'fake id',
        idSolucao: 'fake id',
        nomeSolucao: 'fake solution 1',
        idEscola: 'fake id',
        nomeEscola: 'fake school 1',
        restricao: 'Ocultar' as Restricao,
        ativo: false
      },
      {
        id: 'fake id',
        idSolucao: 'fake id',
        nomeSolucao: 'fake solution 2',
        idEscola: 'fake id',
        nomeEscola: 'fake school 2',
        restricao: 'Exibir' as Restricao,
        ativo: true
      }
    ]
    const result = permissions(
      INITIAL_STATE,
      schoolPermissionsBySolutionSuccess(payload)
    )
    expect(result).toEqual({
      loading: false,
      schoolPermissions: payload,
      profileOptions: [],
      profilePermissions: []
    })
  })
})
