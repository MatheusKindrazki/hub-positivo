import React from 'react'

import { render, fireEvent } from '@psdhub/test-utils'

import CardProduct, {
  CardProductProps as propTypes
} from '../../components/CardProduct'

const handlePush = jest.fn()

const CardProductProps: propTypes = {
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
    CardProductProps.card.link = linkValue
    const { getByTestId } = render(<CardProduct {...CardProductProps} />)

    const cardSolucaoHub = getByTestId('card-container')
    fireEvent.click(cardSolucaoHub)
    expect(handlePush).toHaveBeenCalledWith(linkValue)
  })

  it('Card shows correct notification', () => {
    const notificationText = 'this string is a test notification'
    CardProductProps.card.notificacao = notificationText
    const { queryByText } = render(<CardProduct {...CardProductProps} />)

    const notification = queryByText(notificationText)
    expect(notification).not.toBeNull()
  })

  it('Card has "hub" category when no category is received', () => {
    CardProductProps.category = undefined
    const { getByTestId } = render(<CardProduct {...CardProductProps} />)
    const cardSolucaoHub = getByTestId('card-container')

    expect(cardSolucaoHub.id).toContain('hub')
  })

  it('Card shows "Em breve" text when doesnt receive a link', () => {
    CardProductProps.card.link = undefined
    const { queryByText } = render(<CardProduct {...CardProductProps} />)
    const textoDeEmbreve = queryByText('Em Breve')

    expect(textoDeEmbreve).not.toBeNull()
  })
})
