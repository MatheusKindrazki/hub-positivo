import { Restricao } from '~/store/modules/permissions/types'
import {
  accessControlPostRequest,
  accessControlPostFailure,
  accessControlPostSuccess,
  accessControlPutRequest,
  accessControlPutFailure,
  accessControlPutSuccess
} from '~/store/modules/accessControl/actions'

const mockedTypes = {
  ACCESS_CONTROL_POST_REQUEST: '@accessControl/ACCESS_CONTROL_POST_REQUEST',
  ACCESS_CONTROL_POST_SUCCESS: '@accessControl/ACCESS_CONTROL_POST_SUCCESS',
  ACCESS_CONTROL_POST_FAILURE: '@accessControl/ACCESS_CONTROL_POST_FAILURE',

  ACCESS_CONTROL_PUT_REQUEST: '@accessControl/ACCESS_CONTROL_PUT_REQUEST',
  ACCESS_CONTROL_PUT_SUCCESS: '@accessControl/ACCESS_CONTROL_PUT_SUCCESS',
  ACCESS_CONTROL_PUT_FAILURE: '@accessControl/ACCESS_CONTROL_PUT_FAILURE'
}

describe('accessControl action creators should work properly', () => {
  describe('accessControlPost actions should have correct types and payloads', () => {
    it('should create a request action with correct permissions on accessControlPostRequest', () => {
      const mockedData = {
        solution: {
          nome: 'solucao teste',
          descricao: 'esta solucao nunca existira de verdade',
          arquivo: 'http://mockedicon.com',
          link: 'http://mockedlink.com',
          idCategoria: 'fake category id',
          tipoRenderizacao: 'microfrontend',
          ordem: 1,
          padrao: false
        },
        schoolPermissions: {
          remove: {
            idSolucao: 'fake id',
            idsEscolas: ['id 1', 'id 2', 'id 3']
          },
          create: {
            idSolucao: 'fake id',
            idsEscolas: ['id 1', 'id 2', 'id 3'],
            restricao: 'Exibir' as Restricao
          }
        },
        profilePermissions: {
          remove: {
            idSolucao: 'fake id',
            IdsPerfisNiveisEnsino: ['id 1', 'id 2', 'id 3']
          },
          create: {
            idSolucao: 'fake id',
            IdsPerfisNiveisEnsino: ['id 1', 'id 2', 'id 3']
          }
        }
      }
      const expectedAction = {
        type: mockedTypes.ACCESS_CONTROL_POST_REQUEST,
        payload: mockedData
      }
      expect(accessControlPostRequest(mockedData)).toEqual(expectedAction)
    })
    it('should create a success action with correct type on accessControlPostSuccess', () => {
      const expectedAction = {
        type: mockedTypes.ACCESS_CONTROL_POST_SUCCESS
      }
      expect(accessControlPostSuccess()).toEqual(expectedAction)
    })
    it('should create a failure action with correct type on accessControlPostFailure', () => {
      const expectedAction = {
        type: mockedTypes.ACCESS_CONTROL_POST_FAILURE
      }
      expect(accessControlPostFailure()).toEqual(expectedAction)
    })
  })

  describe(' accessControlPut actions should have correct types and payloads', () => {
    it('should create a request action with correct permissions on accessControlPutRequest', () => {
      const mockedData = {
        solution: {
          id: 'fake id',
          nome: 'solucao teste',
          slug: 'solucao-teste',
          descricao: 'esta solucao nunca existira de verdade',
          arquivo: 'http://mockedicon.com',
          link: 'http://mockedlink.com',
          idCategoria: 'fake category id',
          tipoRenderizacao: 'microfrontend',
          ordem: 1,
          padrao: false,
          ativo: true
        },
        schoolPermissions: {
          remove: {
            idSolucao: 'fake id',
            idsEscolas: ['id 1', 'id 2', 'id 3']
          },
          create: {
            idSolucao: 'fake id',
            idsEscolas: ['id 1', 'id 2', 'id 3'],
            restricao: 'Exibir' as Restricao
          }
        },
        profilePermissions: {
          remove: {
            idSolucao: 'fake id',
            IdsPerfisNiveisEnsino: ['id 1', 'id 2', 'id 3']
          },
          create: {
            idSolucao: 'fake id',
            IdsPerfisNiveisEnsino: ['id 1', 'id 2', 'id 3']
          }
        }
      }
      const expectedAction = {
        type: mockedTypes.ACCESS_CONTROL_PUT_REQUEST,
        payload: mockedData
      }
      expect(accessControlPutRequest(mockedData)).toEqual(expectedAction)
    })
    it('should create a success action with correct type on accessControlPutSuccess', () => {
      const expectedAction = {
        type: mockedTypes.ACCESS_CONTROL_PUT_SUCCESS
      }
      expect(accessControlPutSuccess()).toEqual(expectedAction)
    })
    it('should create a failure action with correct type on accessControlPutFailure', () => {
      const expectedAction = {
        type: mockedTypes.ACCESS_CONTROL_PUT_FAILURE
      }
      expect(accessControlPutFailure()).toEqual(expectedAction)
    })
  })
})
