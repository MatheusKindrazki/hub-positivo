import {
  Actions,
  signInRequest,
  signInSuccess,
  signOut,
} from '~/store/modules/auth/actions';

describe('Actions de Autenticação', () => {
  it('Deve disparar requisição com e-mail e senha', () => {
    const signIn = signInRequest({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(signIn).toEqual({
      type: Actions.SIGN_IN_REQUEST,
      payload: {
        email: 'johndoe@example.com',
        password: '123456',
      },
    });
  });

  it('Deve disparar resposta vazia ( por hora )', () => {
    const signIn = signInSuccess();

    expect(signIn).toEqual({
      type: Actions.SIGN_IN_SUCCESS,
    });
  });

  it('Deve des-logar o usuário', () => {
    const out = signOut();

    expect(out).toEqual({
      type: Actions.SIGN_OUT,
    });
  });
});
