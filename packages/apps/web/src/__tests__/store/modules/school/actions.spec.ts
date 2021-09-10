import * as schoolActions from '~/store/modules/school/actions'

describe('Actions of school module', () => {
  it('schoolGetAllRequest must have correct action type', () => {
    const mockedType = {
      type: '@school/SCHOOL_GETALL_REQUEST'
    }

    const resolved = schoolActions.schoolGetAllRequest()

    expect(resolved).toEqual({ ...mockedType })
  })

  it('schoolGetAllFailure must have correct action type', () => {
    const mockedType = {
      type: '@school/SCHOOL_GETALL_FAILURE'
    }

    const resolved = schoolActions.schoolGetAllFailure()

    expect(resolved).toEqual({ ...mockedType })
  })

  it('schoolGetAllSuccess must have correct action type and payload', () => {
    const spyAction = jest.spyOn(schoolActions, 'schoolGetAllSuccess')

    const mockedType = {
      type: '@school/SCHOOL_GETALL_SUCCESS'
    }

    const mockedPayload = [{ id: 'fake-id', nome: 'escola-teste', ativo: true }]

    const resolved = schoolActions.schoolGetAllSuccess(mockedPayload)

    expect(spyAction).toHaveBeenCalledWith(mockedPayload)

    expect(resolved).toEqual({ ...mockedType, payload: mockedPayload })
  })
})
