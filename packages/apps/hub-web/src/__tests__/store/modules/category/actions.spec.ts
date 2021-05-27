import {
  categoryPostRequest,
  categoryPostFailure,
  categoryPostSuccess,
  categoryGetAllRequest,
  categoryGetAllFailure,
  categoryGetAllSuccess
} from '~/store/modules/category/actions'

const mockedTypes = {
  CATEGORY_POST_REQUEST: '@category/CATEGORY_POST_REQUEST',
  CATEGORY_POST_SUCCESS: '@category/CATEGORY_POST_SUCCESS',
  CATEGORY_POST_FAILURE: '@category/CATEGORY_POST_FAILURE',

  CATEGORY_GETALL_REQUEST: '@category/CATEGORY_GETALL_REQUEST',
  CATEGORY_GETALL_SUCCESS: '@category/CATEGORY_GETALL_SUCCESS',
  CATEGORY_GETALL_FAILURE: '@category/CATEGORY_GETALL_FAILURE'
}

describe('solutions action creators should work properly', () => {
  describe('categoryPost actions should have correct types and payloads', () => {
    it('should create a request action with correct permissions on categoryPostRequest', () => {
      const mockedData = {
        nome: 'categoria fake'
      }
      const expectedAction = {
        type: mockedTypes.CATEGORY_POST_REQUEST,
        payload: mockedData
      }
      expect(categoryPostRequest(mockedData)).toEqual(expectedAction)
    })
    it('should create a success action with correct type on categoryPostSuccess', () => {
      const expectedAction = {
        type: mockedTypes.CATEGORY_POST_SUCCESS
      }
      expect(categoryPostSuccess()).toEqual(expectedAction)
    })
    it('should create a failure action with correct type on categoryPostFailure', () => {
      const expectedAction = {
        type: mockedTypes.CATEGORY_POST_FAILURE
      }
      expect(categoryPostFailure()).toEqual(expectedAction)
    })
  })

  describe('categoryGetAll actions should have correct types and payloads', () => {
    it('should create a request action with correct permissions on categoryGetAllRequest', () => {
      const expectedAction = {
        type: mockedTypes.CATEGORY_GETALL_REQUEST
      }
      expect(categoryGetAllRequest()).toEqual(expectedAction)
    })
    it('should create a success action with correct type on categoryGetAllSuccess', () => {
      const mockedData = [
        {
          id: 'string',
          nome: 'string',
          cor: 'string',
          ativo: true
        }
      ]
      const expectedAction = {
        type: mockedTypes.CATEGORY_GETALL_SUCCESS,
        payload: mockedData
      }
      expect(categoryGetAllSuccess(mockedData)).toEqual(expectedAction)
    })
    it('should create a failure action with correct type on categoryGetAllFailure', () => {
      const expectedAction = {
        type: mockedTypes.CATEGORY_GETALL_FAILURE
      }
      expect(categoryGetAllFailure()).toEqual(expectedAction)
    })
  })
})
