import * as globalActions from '~/store/modules/global/actions'

describe('Action of global history', () => {
  it('Should call the loading action correctly and receive the value within payload', () => {
    const spy = jest.spyOn(globalActions, 'loading')

    const mockedType = {
      type: '@global/LOADING'
    }

    const resolved = globalActions.loading(true)

    expect(spy).toBeCalledWith(true)

    expect(resolved).toEqual({ ...mockedType, payload: true })
  })

  it('Should call the enableRefreshTokenMiddleware action correctly and receive the value within payload', () => {
    const spy = jest.spyOn(globalActions, 'enableRefreshTokenMiddleware')

    const mockedType = {
      type: '@global/ENABLE_REFRESH_TOKEN'
    }

    const resolved = globalActions.enableRefreshTokenMiddleware(true)

    expect(spy).toBeCalledWith(true)

    expect(resolved).toEqual({ ...mockedType, payload: true })
  })
})
