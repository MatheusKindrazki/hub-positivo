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

const dispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => dispatch,
}));

describe('Página de Login', () => {
  it('Deve preencher as informações de login e senha corretamente', () => {
    const { getByPlaceholderText, debug } = render(<SignIn />, {});

    const emailField = getByPlaceholderText('Digite seu e-mail');
    const passwordField = getByPlaceholderText('Digite sua senha');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    debug();

    // expect(emailField).toBe;
  });
});
