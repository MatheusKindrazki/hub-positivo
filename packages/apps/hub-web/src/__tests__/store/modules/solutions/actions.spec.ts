import {
  solutionPostRequest,
  solutionPostFailure,
  solutionPostSuccess,
  solutionPutRequest,
  solutionPutFailure,
  solutionPutSuccess,
  solutionsGetRequest,
  solutionsGetFailure,
  solutionsGetSuccess,
  solutionDeleteRequest,
  solutionDeleteFailure,
  solutionDeleteSuccess,
  solutionRestaureRequest,
  solutionRestaureFailure,
  solutionRestaureSuccess,
  solutionGetExcludedRequest,
  solutionGetExcludedFailure,
  solutionGetExcludedSuccess,
  solutionPostReorderRequest,
  solutionPostReorderFailure,
  solutionPostReorderSuccess
} from '~/store/modules/solutions/actions'

const mockedTypes = {
  SOLUTION_POST_REQUEST: '@solutions/SOLUTION_POST_REQUEST',
  SOLUTION_POST_SUCCESS: '@solutions/SOLUTION_POST_SUCCESS',
  SOLUTION_POST_FAILURE: '@solutions/SOLUTION_POST_FAILURE',

  SOLUTIONS_GET_REQUEST: '@solutions/SOLUTIONS_REQUEST',
  SOLUTIONS_GET_SUCCESS: '@solutions/SOLUTIONS_SUCCESS',
  SOLUTIONS_GET_FAILURE: '@solutions/SOLUTIONS_FAILURE',

  SOLUTION_PUT_REQUEST: '@solutions/SOLUTION_PUT_REQUEST',
  SOLUTION_PUT_SUCCESS: '@solutions/SOLUTION_PUT_SUCCESS',
  SOLUTION_PUT_FAILURE: '@solutions/SOLUTION_PUT_FAILURE',

  SOLUTION_DELETE_REQUEST: '@solutions/SOLUTION_DELETE_REQUEST',
  SOLUTION_DELETE_SUCCESS: '@solutions/SOLUTION_DELETE_SUCCESS',
  SOLUTION_DELETE_FAILURE: '@solutions/SOLUTION_DELETE_FAILURE',

  SOLUTION_RESTAURE_REQUEST: '@solution/SOLUTION_RESTAURE_REQUEST',
  SOLUTION_RESTAURE_SUCCESS: '@solution/SOLUTION_RESTAURE_SUCCESS',
  SOLUTION_RESTAURE_FAILURE: '@solution/SOLUTION_RESTAURE_FAILURE',

  SOLUTIONS_GET_EXCLUDED_REQUEST: '@solution/SOLUTION_GET_EXCLUDED_REQUEST',
  SOLUTIONS_GET_EXCLUDED_SUCCESS: '@solution/SOLUTION_GET_EXCLUDED_SUCCESS',
  SOLUTIONS_GET_EXCLUDED_FAILURE: '@solution/SOLUTION_GET_EXCLUDED_FAILURE',

  SOLUTIONS_POST_REORDER_REQUEST: '@solution/SOLUTIONS_POST_REORDER_REQUEST',
  SOLUTIONS_POST_REORDER_SUCCESS: '@solution/SOLUTIONS_POST_REORDER_SUCCESS',
  SOLUTIONS_POST_REORDER_FAILURE: '@solution/SOLUTIONS_POST_REORDER_FAILURE'
}

describe('solutions action creators should work properly', () => {
  describe('solutionPost actions should have correct types and payloads', () => {
    it('should create a request action with correct permissions on solutionPostRequest', () => {
      const mockedData = {
        nome: 'fake solution',
        descricao: 'fake description',
        arquivo: 'http://fakeiconurl.com',
        link: 'http://fakesolutionurl.com',
        idCategoria: 'fake category',
        tipoRenderizacao: 'microfrontend',
        ordem: 1,
        padrao: false
      }
      const expectedAction = {
        type: mockedTypes.SOLUTION_POST_REQUEST,
        payload: mockedData
      }
      expect(solutionPostRequest(mockedData)).toEqual(expectedAction)
    })
    it('should create a success action with correct type on solutionPostSuccess', () => {
      const solutionId = 'fake solution id'
      const expectedAction = {
        type: mockedTypes.SOLUTION_POST_SUCCESS,
        payload: { id: solutionId }
      }
      expect(solutionPostSuccess(solutionId)).toEqual(expectedAction)
    })
    it('should create a failure action with correct type on solutionPostFailure', () => {
      const expectedAction = {
        type: mockedTypes.SOLUTION_POST_FAILURE
      }
      expect(solutionPostFailure()).toEqual(expectedAction)
    })
  })

  describe('solutionPut actions should have correct types and payloads', () => {
    it('should create a request action with correct permissions on solutionPutRequest', () => {
      const mockedData = {
        id: 'fake solution id',
        nome: 'fake solution',
        slug: 'fake-solution',
        descricao: 'fake description',
        arquivo: 'http://fakeiconurl.com',
        link: 'http://fakesolutionurl.com',
        idCategoria: 'fake category',
        tipoRenderizacao: 'microfrontend',
        ordem: 1,
        padrao: false,
        ativo: true
      }
      const expectedAction = {
        type: mockedTypes.SOLUTION_PUT_REQUEST,
        payload: mockedData
      }
      expect(solutionPutRequest(mockedData)).toEqual(expectedAction)
    })
    it('should create a success action with correct type on solutionPutSuccess', () => {
      const expectedAction = {
        type: mockedTypes.SOLUTION_PUT_SUCCESS
      }
      expect(solutionPutSuccess()).toEqual(expectedAction)
    })
    it('should create a failure action with correct type on solutionPutFailure', () => {
      const expectedAction = {
        type: mockedTypes.SOLUTION_PUT_FAILURE
      }
      expect(solutionPutFailure()).toEqual(expectedAction)
    })
  })

  describe('solutionsGet actions should have correct types and payloads', () => {
    it('should create a request action with correct permissions on solutionsGetRequest', () => {
      const expectedAction = {
        type: mockedTypes.SOLUTIONS_GET_REQUEST
      }
      expect(solutionsGetRequest()).toEqual(expectedAction)
    })
    it('should create a success action with correct type on solutionsGetSuccess', () => {
      const mockedData = [
        {
          id: 'string',
          ordem: 1,
          ativo: true,
          nome: 'string',
          cor: 'string',
          solucoes: [
            {
              id: 'fake solution id',
              nome: 'fake solution',
              slug: 'fake-solution',
              descricao: 'fake description',
              arquivo: 'http://fakeiconurl.com',
              link: 'http://fakesolutionurl.com',
              idCategoria: 'fake category',
              tipoRenderizacao: 'microfrontend',
              ordem: 1,
              padrao: false,
              ativo: true,
              permissoes: [
                {
                  id: 'fake permission id',
                  perfil: 'professor',
                  niveisEnsino: ['EF1', 'EF2', 'EM']
                }
              ],
              escolas: [
                {
                  id: 'fake school permission id',
                  idEscola: 'fake school id',
                  nome: 'fake school'
                }
              ]
            }
          ]
        }
      ]
      const expectedAction = {
        type: mockedTypes.SOLUTIONS_GET_SUCCESS,
        payload: mockedData
      }
      expect(solutionsGetSuccess(mockedData)).toEqual(expectedAction)
    })
    it('should create a failure action with correct type on solutionsGetFailure', () => {
      const expectedAction = {
        type: mockedTypes.SOLUTIONS_GET_FAILURE
      }
      expect(solutionsGetFailure()).toEqual(expectedAction)
    })
  })

  describe('solutionDelete actions should have correct types and payloads', () => {
    it('should create a request action with correct permissions on solutionDeleteRequest', () => {
      const mockedId = 'fakeSolutionId'
      const expectedAction = {
        type: mockedTypes.SOLUTION_DELETE_REQUEST,
        payload: {
          id: mockedId
        }
      }
      expect(solutionDeleteRequest(mockedId)).toEqual(expectedAction)
    })
    it('should create a success action with correct type on solutionDeleteSuccess', () => {
      const expectedAction = {
        type: mockedTypes.SOLUTION_DELETE_SUCCESS
      }
      expect(solutionDeleteSuccess()).toEqual(expectedAction)
    })
    it('should create a failure action with correct type on solutionDeleteFailure', () => {
      const expectedAction = {
        type: mockedTypes.SOLUTION_DELETE_FAILURE
      }
      expect(solutionDeleteFailure()).toEqual(expectedAction)
    })
  })

  describe('solutionRestaure actions should have correct types and payloads', () => {
    it('should create a request action with correct permissions on solutionRestaureRequest', () => {
      const mockedId = 'fakeSolutionId'
      const expectedAction = {
        type: mockedTypes.SOLUTION_RESTAURE_REQUEST,
        payload: {
          id: mockedId
        }
      }
      expect(solutionRestaureRequest(mockedId)).toEqual(expectedAction)
    })
    it('should create a success action with correct type on solutionRestaureSuccess', () => {
      const expectedAction = {
        type: mockedTypes.SOLUTION_RESTAURE_SUCCESS
      }
      expect(solutionRestaureSuccess()).toEqual(expectedAction)
    })
    it('should create a failure action with correct type on solutionRestaureFailure', () => {
      const expectedAction = {
        type: mockedTypes.SOLUTION_RESTAURE_FAILURE
      }
      expect(solutionRestaureFailure()).toEqual(expectedAction)
    })
  })

  describe('solutionGetExcluded actions should have correct types and payloads', () => {
    it('should create a request action with correct permissions on solutionGetExcludedRequest', () => {
      const expectedAction = {
        type: mockedTypes.SOLUTIONS_GET_EXCLUDED_REQUEST
      }
      expect(solutionGetExcludedRequest()).toEqual(expectedAction)
    })
    it('should create a success action with correct type on solutionGetExcludedSuccess', () => {
      const expectedAction = {
        type: mockedTypes.SOLUTIONS_GET_EXCLUDED_SUCCESS
      }
      expect(solutionGetExcludedSuccess()).toEqual(expectedAction)
    })
    it('should create a failure action with correct type on solutionGetExcludedFailure', () => {
      const expectedAction = {
        type: mockedTypes.SOLUTIONS_GET_EXCLUDED_FAILURE
      }
      expect(solutionGetExcludedFailure()).toEqual(expectedAction)
    })
  })

  describe('solutionPostReorder actions should have correct types and payloads', () => {
    it('should create a request action with correct permissions on solutionPostReorderRequest', () => {
      const mockedData = [
        {
          id: 'fake id',
          ordem: 1
        },
        {
          id: 'fake id 2',
          ordem: 2
        }
      ]
      const expectedAction = {
        type: mockedTypes.SOLUTIONS_POST_REORDER_REQUEST,
        payload: mockedData
      }
      expect(solutionPostReorderRequest(mockedData)).toEqual(expectedAction)
    })
    it('should create a success action with correct type on solutionPostReorderSuccess', () => {
      const expectedAction = {
        type: mockedTypes.SOLUTIONS_POST_REORDER_SUCCESS
      }
      expect(solutionPostReorderSuccess()).toEqual(expectedAction)
    })
    it('should create a failure action with correct type on solutionPostReorderFailure', () => {
      const expectedAction = {
        type: mockedTypes.SOLUTIONS_POST_REORDER_FAILURE
      }
      expect(solutionPostReorderFailure()).toEqual(expectedAction)
    })
  })
})
