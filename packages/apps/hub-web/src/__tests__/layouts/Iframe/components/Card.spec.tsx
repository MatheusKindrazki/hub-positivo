import React from 'react'

import { render } from '@hub/test-utils'

import Card, { CardProps } from '~/layouts/Iframe/components/Card'

describe('getting started', () => {
  let card: CardProps

  beforeAll(() => {
    card = {
      id: 'id',
      nome: 'card name',
      descricao: 'description',
      cor: 'blue',
      arquivo: 'file',
      notificacao: 'notification',
      ativo: true,
      link: 'psd.link.com',
      tipoRenderizacao: 'iframe'
    }
  })
  const setup = (card = {} as CardProps) => {
    const onClick = jest.fn()
    const wrapper = render(<Card card={card} onClick={onClick} />)
    return { ...wrapper, onClick }
  }
  it('it', () => {
    const { debug } = setup(card)
    debug()
  })
})
