import GlobalReducer, { INITIAL_STATE } from '~/store/modules/global/reducer'
import * as globalActions from '~/store/modules/global/actions'

describe('Reducer of authentication history', () => {
  it('Should set the loading for the chosen', () => {
    const action = globalActions.loading(true)

    const state = GlobalReducer(INITIAL_STATE, action)

    expect(state.loading).toEqual(true)
  })

  it('Should set the enableRefreshTokenMiddleware for the chosen', () => {
    const action = globalActions.enableRefreshTokenMiddleware(true)

    const state = GlobalReducer(INITIAL_STATE, action)

    expect(state.enableMiddlewareRefreshToken).toEqual(true)
  })
})
