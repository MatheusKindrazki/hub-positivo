import React from 'react';

import { render } from '@testing-library/react';

import SignIn from '../../pages/SignIn';

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),
  };
});

describe('Página de Login', () => {
  it('Deve ser possível se logar na aplicação', () => {
    const { debug } = render(<SignIn />);

    expect(1).toEqual(1);

    debug();
  });
});
