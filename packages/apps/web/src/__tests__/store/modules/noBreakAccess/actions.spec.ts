import * as noBreakActions from '~/store/modules/noBreakAccess/actions'

describe('Actions of school module', () => {
  const mockedPayload = {
    user_login: 'test-user'
  }

  it('schoolGetAllRequest must have correct action type', () => {
    const mockedType = {
      type: '@nobreak/ENABLE'
    }

    const resolved = noBreakActions.noBreakAccessEnable(mockedPayload)

    expect(resolved).toStrictEqual({ ...mockedType, payload: mockedPayload })
  })

  it('schoolGetAllFailure must have correct action type', () => {
    const mockedType = {
      type: '@nobreak/DISABLE'
    }

    const resolved = noBreakActions.noBreakAccessDisable(mockedPayload)

    expect(resolved).toStrictEqual({ ...mockedType, payload: mockedPayload })
  })
})
