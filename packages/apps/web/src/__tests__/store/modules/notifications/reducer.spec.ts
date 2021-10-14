import notificationsReducer, {
  INITIAL_STATE
} from '~/store/modules/notifications/reducer'
import * as notificationsActions from '~/store/modules/notifications/actions'

describe('Reducer of authentication history', () => {
  it('Should set Loading to True When Request Action is Triggered', () => {
    const action = notificationsActions.notificationsRequest()

    const state = notificationsReducer(INITIAL_STATE, action)

    expect(state.loading).toEqual(true)
  })

  it('Should set Loading to false and history to api response When Success Action is Triggered', () => {
    const mock = [
      {
        origin: 'source',
        message: 'message',
        sentDate: new Date(),
        expirationDate: new Date(),
        id: 'id',
        title: 'titulo',
        url: 'url'
      }
    ]

    const action = notificationsActions.notificationsSuccess(mock)

    const state = notificationsReducer(INITIAL_STATE, action)

    expect(state.history).toEqual(mock)
  })

  it('Should set Loading to false and history to undefined When Failure Action is Triggered', () => {
    const action = notificationsActions.notificationsFailure()

    const state = notificationsReducer(undefined, action)

    expect(state.loading).toEqual(false)
    expect(state.history).toBeUndefined()
  })

  it('Should return the unchanged state if it does not contain any action', () => {
    const state = notificationsReducer(undefined, { type: 'non-valid-type' })

    expect(state).toEqual(INITIAL_STATE)
  })
})
