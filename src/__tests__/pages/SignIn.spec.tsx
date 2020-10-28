import React from 'react';

// import * as ReactRedux from 'react-redux';

import SignIn from '~/pages/Auth/SignIn';

import { fireEvent, render } from '../testing-library';

interface Link {
  children: React.ReactNode;
}

jest.mock('react-router-dom', () => ({
  Link: ({ children }: Link) => children,
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe('Página de Login', () => {
  it('Deve preencher as informações de login e senha corretamente', () => {
    const spy = jest.spyOn(SignIn.prototype, 'handleSubmit');

    const { getByPlaceholderText, getByTestId } = render(<SignIn />);

    const emailField = getByPlaceholderText('Digite seu e-mail');
    const passwordField = getByPlaceholderText('Digite sua senha');
    const submitButton = getByTestId('submit');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    expect(spy).toHaveBeenCalled();
  });
});
