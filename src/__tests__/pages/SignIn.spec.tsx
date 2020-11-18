import React from 'react';

import { useDispatch } from 'react-redux';

import { render, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';

import ThemeProvider from '~/hooks/ThemeContainer';
import SignIn from '~/pages/Auth/SignIn';
import { Actions } from '~/store/modules/auth/actions';

describe('Página de login', () => {
  it('O usuário deve ser autenticado ao preencher as informações corretamente!', async () => {
    const dispatch = jest.fn();

    (useDispatch as jest.Mock).mockReturnValue(dispatch);

    const wrapper = render(
      <ThemeProvider>
        <SignIn />
      </ThemeProvider>,
    );

    const userMail = wrapper.getByTestId('email');
    const userPassword = wrapper.getByTestId('password');
    const submit = wrapper.getByTestId('submit-button');

    fireEvent.change(userMail, { target: { value: 'jonhdoe@example.com' } });

    fireEvent.change(userPassword, { target: { value: '123456' } });

    fireEvent.click(submit);

    await waitFor(() =>
      expect(dispatch).toHaveBeenCalledWith({
        type: Actions.SIGN_IN_REQUEST,
        payload: { username: 'jonhdoe@example.com', password: '123456' },
      }),
    );
  });

  it('O usuário não deve ser autenticado ao preencher as informações incorretamente!', async () => {
    const dispatch = jest.fn();

    (useDispatch as jest.Mock).mockReturnValue(dispatch);

    const wrapper = render(
      <ThemeProvider>
        <SignIn />
      </ThemeProvider>,
    );

    const userMail = wrapper.getByTestId('email');
    const userPassword = wrapper.getByTestId('password');
    const submit = wrapper.getByTestId('submit-button');

    fireEvent.change(userMail, { target: { value: 'not-valid-mail' } });

    fireEvent.change(userPassword, { target: { value: '123456' } });

    fireEvent.click(submit);

    await waitFor(() => expect(dispatch).not.toHaveBeenCalled());
  });

  it('O usuário deve ver um toast de erro quando o login falhar', async () => {
    (useDispatch as jest.Mock).mockReturnValue(() => {
      throw new Error();
    });

    const wrapper = render(
      <ThemeProvider>
        <SignIn />
      </ThemeProvider>,
    );

    const userMail = wrapper.getByTestId('email');
    const userPassword = wrapper.getByTestId('password');
    const submit = wrapper.getByTestId('submit-button');

    fireEvent.change(userMail, { target: { value: 'jonhdoe@example.com' } });

    fireEvent.change(userPassword, { target: { value: '123456' } });

    fireEvent.click(submit);

    await waitFor(() => expect(toast.error).toHaveBeenCalledTimes(1));
  });
});
