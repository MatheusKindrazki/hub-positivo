import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import ThemeProvider from '~/hooks/ThemeContainer';
import SignIn from '~/pages/Auth/SignIn';

jest.mock('polished', () => {
  return {
    lighten: jest.fn(),
    darken: jest.fn(),
  };
});

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

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Página de login', () => {
  it('O input precisa retornar o valor preenchido pelo usuário', () => {
    const wrapper = render(
      <ThemeProvider>
        <SignIn />
      </ThemeProvider>,
    );

    const input = wrapper.getByPlaceholderText(
      'Digite seu e-mail',
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'jonhdoe@gmail.com' } });

    expect(input.value).toBe('jonhdoe@gmail.com');
  });

  it('O Botão submit precisa acionar a função handleSubmit', () => {
    const wrapper = render(
      <ThemeProvider>
        <SignIn />
      </ThemeProvider>,
    );

    const submit = wrapper.getByTestId('submit-button');

    fireEvent.click(submit);
  });
});
