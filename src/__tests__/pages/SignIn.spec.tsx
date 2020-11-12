import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import ThemeProvider from '~/hooks/ThemeContainer';
import SignIn from '~/pages/Auth/SignIn';

jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn(),
    useSelector: jest.fn().mockReturnValue(() => {
      return {
        profile: 'aluno',
      };
    }),
  };
});

jest.mock('polished', () => {
  return {
    lighten: jest.fn(),
    darken: jest.fn(),
  };
});

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});
describe('Página de login', () => {
  it('teste', () => {
    const wrapper = render(
      <ThemeProvider>
        <SignIn />
      </ThemeProvider>,
    );

    const input = wrapper.getByPlaceholderText('Digite seu e-mail');

    fireEvent.change(input, { target: { value: 'teste' } });

    const teste = input as HTMLInputElement;

    expect(teste.value).toBe('teste');
  });
});
