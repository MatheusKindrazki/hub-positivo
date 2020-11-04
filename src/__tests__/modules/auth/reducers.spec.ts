import { Actions } from '~/store/modules/auth/actions';
import authReducer, { INITIAL_STATE } from '~/store/modules/auth/reducer';

describe('Reducers de Autenticação', () => {
  it('Deve agir desta forma no Request da Action', () => {
    const auth = authReducer(INITIAL_STATE, { type: Actions.SIGN_IN_REQUEST });

    expect(auth).toEqual({
      ...INITIAL_STATE,
      signed: false,
      loading: true,
    });
  });
});
