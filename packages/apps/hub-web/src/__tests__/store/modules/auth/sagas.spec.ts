import * as authSagas from '~/store/modules/auth/sagas'
import * as authActions from '~/store/modules/auth/actions'

describe('Sagas of authentication history', () => {
  it('hope the user authenticate with valid login and password and pass is redirected to choice', () => {
    const mockedAction = authActions.signInRequest({
      username: 'johndoe',
      password: '123456',
      redirect: undefined
    })

    const generator = authSagas.signIn({ ...mockedAction }).next
  })
})
