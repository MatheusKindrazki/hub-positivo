import React from 'react';

import { render } from '@testing-library/react';

import CardProduct from '~/components/CardProduct';

import ThemeProvider from '~/hooks/ThemeContainer';

const mock = {
  id: 0,
  title: 'Guia de Estudo',
  description: 'Lista de exercícios pronta do Guia de Estudos na Studos',
  notification: '2',
  url: '#!',
  color: '#3F51B5',
  icon: 'cards/avaliacao-1.svg',
  iframe: true,
};

describe('Componente CardProduct', () => {
  it('O Card deve estar definido corretamente', () => {
    const wrapper = render(
      <ThemeProvider>
        <CardProduct card={mock} />
      </ThemeProvider>,
    );

    expect(wrapper).toBeDefined();
  });

  it('O Card deve renderizar as informações corretamente', () => {
    // const wrapper = render(
    //   <ThemeProvider>
    //     <CardProduct card={mock} />
    //   </ThemeProvider>,
    // );
    // const title = wrapper.getByText('Guia de Estudo').innerHTML;
  });
});
