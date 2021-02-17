import React from 'react'
import '@testing-library/jest-dom'

import { render, fireEvent } from '@hub/test-utils'

import CardProduct from '../../components/CardProduct'
import { CardProductProps as propTypes } from '../../components/CardProduct'

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
  it('Card redireciona para o link correto', () => {
    const linkValue = 'this link is a test'
    CardProductProps.card.link = linkValue
    const { getByTestId } = render(<CardProduct {...CardProductProps} />)

    const cardSolucaoHub = getByTestId('card-container')
    fireEvent.click(cardSolucaoHub)
    expect(handlePush).toHaveBeenCalledWith(linkValue)
  })

  it('Card exibe a notificacao correta', () => {
    const notificationText = 'this string is a test notification'
    CardProductProps.card.notificacao = notificationText
    const { getByText } = render(<CardProduct {...CardProductProps} />)

    const notification = getByText(notificationText)
    expect(notification).toBeInTheDocument()
  })

  it('Card apresenta categoria "hub" quando nao recebe uma categoria', () => {
    CardProductProps.category = undefined
    const { getByTestId } = render(<CardProduct {...CardProductProps} />)
    const cardSolucaoHub = getByTestId('card-container')

    expect(cardSolucaoHub.id).toContain('hub')
  })

  it('Card exibe texto de em breve quando nao recebe um link', () => {
    CardProductProps.card.link = undefined
    const { getByText } = render(<CardProduct {...CardProductProps} />)
    const textoDeEmbreve = getByText('Em Breve')

    expect(textoDeEmbreve).toBeInTheDocument()
  })
})
