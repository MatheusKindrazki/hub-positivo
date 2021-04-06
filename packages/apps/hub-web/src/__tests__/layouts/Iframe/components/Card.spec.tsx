import React from 'react'

import { fireEvent, render } from '@psdhub/test-utils'

import Card, { CardProps } from '~/layouts/Iframe/components/Card'

describe('Card`s layout should work properly', () => {
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

  afterEach(() => {
    jest.clearAllMocks()
  })

  const setup = (card: CardProps) => {
    const onClick = jest.fn()
    const wrapper = render(<Card card={card} onClick={onClick} />)
    const cardName = wrapper.getByText(card.nome)

    return { ...wrapper, onClick, cardName }
  }

  it('Should render card`s elements on screen', () => {
    const { cardName } = setup(card)

    expect(cardName).toBeInTheDocument()
  })

  it('Should call onClick function when card box is clicked', () => {
    card.link = undefined
    const { cardName, onClick } = setup(card)

    fireEvent.click(cardName)

    const { nome, tipoRenderizacao, link } = card
    expect(onClick).toHaveBeenCalledWith({
      nome,
      tipoRenderizacao,
      url: link || ''
    })
  })
})
