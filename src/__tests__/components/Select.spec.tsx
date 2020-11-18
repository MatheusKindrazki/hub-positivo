import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Select from '~/components/Select';

import ThemeProvider from '~/hooks/ThemeContainer';

interface PropsSelect {
  label: string;
  value: string;
}

const mock: PropsSelect[] = [
  {
    label: 'Escola 1',
    value: '1',
  },
  {
    label: 'Escola 2',
    value: '1',
  },
];

describe('Componente Select', () => {
  it('O Select deve estar definido corretamente', () => {
    const wrapper = render(
      <ThemeProvider>
        <Select variant="normal" options={mock} />
      </ThemeProvider>,
    );

    expect(wrapper).toBeDefined();
  });

  it('O Select deve mostra a variant correta selecionada', () => {
    const wrapper = render(
      <ThemeProvider>
        <Select variant="normal" options={mock} defaultMenuIsOpen={true} />
      </ThemeProvider>,
    );

    const selectClass = wrapper.container.querySelector('.hub-select');

    expect(selectClass).toHaveClass('normal');
  });

  it('O Select deve mostrar a quantidade certa de itens em tela', () => {
    const wrapper = render(
      <ThemeProvider>
        <Select variant="normal" options={mock} defaultMenuIsOpen={true} />
      </ThemeProvider>,
    );

    const listOptions = wrapper.container.querySelectorAll('.hub__option');

    expect(listOptions).toHaveLength(2);
  });

  it('O Select deve disparar a função quando chamada com o valor selecionado', () => {
    const handleMockChange = jest.fn();

    const wrapper = render(
      <ThemeProvider>
        <Select
          variant="normal"
          onChange={e => handleMockChange(e)}
          defaultMenuIsOpen={true}
          options={mock}
        />
      </ThemeProvider>,
    );

    const listOptions = wrapper.getByText('Escola 1');

    fireEvent.click(listOptions);

    expect(handleMockChange).toHaveBeenCalledWith({
      label: 'Escola 1',
      value: '1',
    });
  });
});
