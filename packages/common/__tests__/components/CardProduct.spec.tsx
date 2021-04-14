import React from 'react'

import { render, fireEvent } from '@psdhub/test-utils'

import CardProduct, { CardProductProps } from '../../components/CardProduct'

const handlePush = jest.fn()

const cardProduct: CardProductProps = {
  handlePush,
  cor: 'test',
  category: 'teste',
  card: {
    id: 'string',
    nome: 'string',
    descricao: 'string',
    arquivo: 'string',
    ativo: true
  }
}

describe('CardProduct component should work properly', () => {
  it('Card redirects to the correct link', () => {
    const linkValue = 'this link is a test'
    cardProduct.card.link = linkValue
    const { getByTestId } = render(<CardProduct {...cardProduct} />)

    const cardSolucaoHub = getByTestId('card-container')
    fireEvent.click(cardSolucaoHub)
    expect(handlePush).toHaveBeenCalledWith(linkValue)
  })

  it('Card shows correct notification', () => {
    const notificationText = 'this string is a test notification'
    cardProduct.card.notificacao = notificationText
    const { queryByText } = render(<CardProduct {...cardProduct} />)

    const notification = queryByText(notificationText)
    expect(notification).not.toBeNull()
  })

  it('Card has "hub" category when no category is received', () => {
    cardProduct.category = undefined
    const { getByTestId } = render(<CardProduct {...cardProduct} />)
    const cardSolucaoHub = getByTestId('card-container')

    expect(cardSolucaoHub.id).toContain('hub')
  })

  it("Card shows 'Em breve' text when doesn't receive a link", () => {
    cardProduct.card.link = undefined
    const { getByText } = render(<CardProduct {...cardProduct} />)
    const textoDeEmBreve = getByText('Em Breve')

    expect(textoDeEmBreve).toBeInTheDocument()
  })
})
