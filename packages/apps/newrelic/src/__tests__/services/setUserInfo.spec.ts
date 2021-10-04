import setUserInfo, { SetUserInfoOptions } from '../../services/setUserInfo'

describe('New relic User Info', () => {
  const dispatchCustomAttributes = jest.fn()

  Object.assign(window, {
    newrelic: {
      setCustomAttribute: dispatchCustomAttributes
    }
  })

  it('should set user info', () => {
    const userInfo: SetUserInfoOptions = {
      user_id: '123',
      user_name: 'John Doe'
    }

    setUserInfo(userInfo)

    expect(dispatchCustomAttributes).toHaveBeenCalledWith('user_id', '123')
    expect(dispatchCustomAttributes).toHaveBeenCalledWith(
      'user_name',
      'John Doe'
    )
  })
})
