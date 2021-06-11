import { Restricao } from '~/store/modules/permissions/types'
import {
  profilePermissionsRequest,
  profilePermissionsSuccess,
  profilePermissionsFailure,
  schoolPermissionsRequest,
  schoolPermissionsSuccess,
  schoolPermissionsFailure,
  getAllProfilePermissionsRequest,
  getAllProfilePermissionsSuccess,
  getAllProfilePermissionsFailure,
  profilePermissionsBySolutionRequest,
  profilePermissionsBySolutionFailure,
  profilePermissionsBySolutionSuccess,
  schoolPermissionsBySolutionRequest,
  schoolPermissionsBySolutionFailure,
  schoolPermissionsBySolutionSuccess
} from '~/store/modules/permissions/actions'

const mockedTypes = {
  PROFILE_PERMISSIONS_REQUEST: '@permissions/PROFILE_PERMISSIONS_REQUEST',
  PROFILE_PERMISSIONS_SUCCESS: '@permissions/PROFILE_PERMISSIONS_SUCCESS',
  PROFILE_PERMISSIONS_FAILURE: '@permissions/PROFILE_PERMISSIONS_FAILURE',

  PROFILE_PERMISSIONS_BYID_REQUEST:
    '@permissions/PROFILE_PERMISSIONS_BYID_REQUEST',
  PROFILE_PERMISSIONS_BYID_SUCCESS:
    '@permissions/PROFILE_PERMISSIONS_BYID_SUCCESS',
  PROFILE_PERMISSIONS_BYID_FAILURE:
    '@permissions/PROFILE_PERMISSIONS_BYID_FAILURE',

  GETALL_PROFILE_PERMISSIONS_REQUEST:
    '@permissions/GETALL_PROFILE_PERMISSIONS_REQUEST',
  GETALL_PROFILE_PERMISSIONS_SUCCESS:
    '@permissions/GETALL_PROFILE_PERMISSIONS_SUCCESS',
  GETALL_PROFILE_PERMISSIONS_FAILURE:
    '@permissions/GETALL_PROFILE_PERMISSIONS_FAILURE',

  SCHOOL_PERMISSIONS_REQUEST: '@permissions/SCHOOL_PERMISSIONS_REQUEST',
  SCHOOL_PERMISSIONS_SUCCESS: '@permissions/SCHOOL_PERMISSIONS_SUCCESS',
  SCHOOL_PERMISSIONS_FAILURE: '@permissions/SCHOOL_PERMISSIONS_FAILURE',

  SCHOOL_PERMISSIONS_BYID_REQUEST:
    '@permissions/SCHOOL_PERMISSION_BYID_REQUEST',
  SCHOOL_PERMISSIONS_BYID_SUCCESS:
    '@permissions/SCHOOL_PERMISSION_BYID_SUCCESS',
  SCHOOL_PERMISSIONS_BYID_FAILURE: '@permissions/SCHOOL_PERMISSION_BYID_FAILURE'
}

describe('permissions action creators should work properly', () => {
  describe('profilePermissions actions should have correct types and payloads', () => {
    it('should create an request action with correct permissions on profilePermissionsRequest', () => {
      const payload = {
        remove: {
          idSolucao: 'fake solution id',
          IdsPerfisNiveisEnsino: ['fake id 1', 'fake id 2', 'fake id 3']
        },
        create: {
          idSolucao: 'fake solution id 2',
          IdsPerfisNiveisEnsino: ['fake id 4', 'fake id 5', 'fake id 6']
        }
      }
      const expectedAction = {
        type: mockedTypes.PROFILE_PERMISSIONS_REQUEST,
        payload
      }
      expect(profilePermissionsRequest(payload)).toEqual(expectedAction)
    })
    it('should create an success action with correct type on profilePermissionsSuccess', () => {
      const expectedAction = {
        type: mockedTypes.PROFILE_PERMISSIONS_SUCCESS
      }
      expect(profilePermissionsSuccess()).toEqual(expectedAction)
    })
    it('should create an failure action with correct type on profilePermissionsFailure', () => {
      const expectedAction = {
        type: mockedTypes.PROFILE_PERMISSIONS_FAILURE
      }
      expect(profilePermissionsFailure()).toEqual(expectedAction)
    })
  })

  describe('schoolPermissions actions should have correct types and payloads', () => {
    it('should create an request action with correct permissions on schoolPermissionsRequest', () => {
      const payload = {
        remove: {
          idSolucao: 'fake solution id',
          idsEscolas: ['fake id 1', 'fake id 2', 'fake id 3']
        },
        create: {
          idSolucao: 'fake solution id 2',
          idsEscolas: ['fake id 4', 'fake id 5', 'fake id 6'],
          restricao: 'Exibir' as Restricao
        }
      }
      const expectedAction = {
        type: mockedTypes.SCHOOL_PERMISSIONS_REQUEST,
        payload
      }
      expect(schoolPermissionsRequest(payload)).toEqual(expectedAction)
    })
    it('should create an success action with correct type on schoolPermissionsSuccess', () => {
      const expectedAction = {
        type: mockedTypes.SCHOOL_PERMISSIONS_SUCCESS
      }
      expect(schoolPermissionsSuccess()).toEqual(expectedAction)
    })
    it('should create an failure action with correct type on schoolPermissionsFailure', () => {
      const expectedAction = {
        type: mockedTypes.SCHOOL_PERMISSIONS_FAILURE
      }
      expect(schoolPermissionsFailure()).toEqual(expectedAction)
    })
  })

  describe('getAllProfilePermissions actions should have correct types and payloads', () => {
    it('should create an request action with correct type on getAllProfilePermissionsRequest', () => {
      const expectedAction = {
        type: mockedTypes.GETALL_PROFILE_PERMISSIONS_REQUEST
      }
      expect(getAllProfilePermissionsRequest()).toEqual(expectedAction)
    })
    it('should create an success action with correct permissions on getAllProfilePermissionsSuccess', () => {
      const payload = [
        { id: 'id fake 1', perfil: 'professor', nivelEnsino: 'EF1' },
        { id: 'id fake 2', perfil: 'aluno', nivelEnsino: 'EF1' },
        { id: 'id fake 3', perfil: 'administrador', nivelEnsino: null }
      ]

      const expectedAction = {
        type: mockedTypes.GETALL_PROFILE_PERMISSIONS_SUCCESS,
        payload
      }
      expect(getAllProfilePermissionsSuccess(payload)).toEqual(expectedAction)
    })
    it('should create an failure action with correct type on getAllProfilePermissionsFailure', () => {
      const expectedAction = {
        type: mockedTypes.GETALL_PROFILE_PERMISSIONS_FAILURE
      }
      expect(getAllProfilePermissionsFailure()).toEqual(expectedAction)
    })
  })

  describe('profilePermissionsBySolution actions should have correct types and payloads', () => {
    it('should create an request action with correct type on profilePermissionsBySolutionRequest', () => {
      const id = 'fake id'

      const expectedAction = {
        type: mockedTypes.PROFILE_PERMISSIONS_BYID_REQUEST,
        payload: { id }
      }
      expect(profilePermissionsBySolutionRequest(id)).toEqual(expectedAction)
    })
    it('should create an success action with correct permissions on profilePermissionsBySolutionSuccess', () => {
      const payload = [
        { id: 'id fake 1', idSolucao: 'professor', idPerfilNivelEnsino: 'EF1' },
        { id: 'id fake 2', idSolucao: 'aluno', idPerfilNivelEnsino: 'EF1' }
      ]

      const expectedAction = {
        type: mockedTypes.PROFILE_PERMISSIONS_BYID_SUCCESS,
        payload
      }
      expect(profilePermissionsBySolutionSuccess(payload)).toEqual(
        expectedAction
      )
    })
    it('should create an failure action with correct type on profilePermissionsBySolutionFailure', () => {
      const expectedAction = {
        type: mockedTypes.PROFILE_PERMISSIONS_BYID_FAILURE
      }
      expect(profilePermissionsBySolutionFailure()).toEqual(expectedAction)
    })
  })

  describe('schoolRestrictionsBySolution actions should have correct types and payloads', () => {
    it('should create an request action with correct type on schoolRestrictionsBySolutionRequest', () => {
      const id = 'fake id'

      const expectedAction = {
        type: mockedTypes.SCHOOL_PERMISSIONS_BYID_REQUEST,
        payload: { id }
      }
      expect(schoolPermissionsBySolutionRequest(id)).toEqual(expectedAction)
    })
    it('should create an success action with correct permissions on schoolRestrictionsBySolutionSuccess', () => {
      const payload = [
        {
          id: 'fake id',
          idSolucao: 'fake solution id',
          nomeSolucao: 'solucao teste',
          idEscola: 'fake school id',
          nomeEscola: 'fake school',
          restricao: 'Ocultar' as Restricao,
          ativo: false
        },
        {
          id: 'fake id',
          idSolucao: 'fake solution id',
          nomeSolucao: 'solucao teste',
          idEscola: 'fake school id',
          nomeEscola: 'fake school',
          restricao: 'Ocultar' as Restricao,
          ativo: false
        }
      ]

      const expectedAction = {
        type: mockedTypes.SCHOOL_PERMISSIONS_BYID_SUCCESS,
        payload
      }
      expect(schoolPermissionsBySolutionSuccess(payload)).toEqual(
        expectedAction
      )
    })
    it('should create an failure action with correct type on schoolRestrictionsBySolutionFailure', () => {
      const expectedAction = {
        type: mockedTypes.SCHOOL_PERMISSIONS_BYID_FAILURE
      }
      expect(schoolPermissionsBySolutionFailure()).toEqual(expectedAction)
    })
  })
})
