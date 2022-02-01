import React from 'react'

import { fireEvent } from '@testing-library/dom'

import { CardProduct } from '~/store/modules/products/types'

import { render } from '@psdhub/test-utils'

import { Submenu } from '~/components/MenuBar/components'

jest.mock('~/components/SimpleCard', () => ({
  __esModule: true,
  default: ({ onClick = jest.fn(), title }: any) => (
    <button onClick={onClick}>{title}</button>
  )
}))

jest.mock('~/components/SimpleCard', () => ({
  __esModule: true,
  default: ({ onClick = jest.fn(), title }: any) => (
    <button onClick={onClick}>{title}</button>
  )
}))

jest.mock('@psdhub/common/components/Menu', () => ({
  Menu: jest.fn(({ children }: any) => <div>{children}</div>),
  MenuList: jest.fn(({ children }: any) => <div>{children}</div>),
  MenuButton: jest.fn(({ children }: any) => <button>{children}</button>)
}))

describe('Submenu should work properly', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const setup = ({ link }: { link?: string }) => {
    const solutionName = 'solution_name'
    const categoryName = 'category_name'
    const card: CardProduct = {
      ativo: true,
      cor: 'blue',
      id: 'id',
      nome: categoryName,
      solucoes: [
        {
          nome: solutionName,
          link,
          arquivo: 'img',
          ativo: true,
          descricao: 'description',
          id: 'solution_id',
          tipoRenderizacao: 'microfrontend',
          notificacao: '',
          dataCadastro: new Date()
        }
      ]
    }
    const handleClick = jest.fn()

    const wrapper = render(
      <Submenu
        handleClick={handleClick}
        card={card}
        isOpen={true}
        onClose={jest.fn()}
        onOpen={jest.fn()}
        isDesktop={true}
      />
    )
    return { handleClick, card, solutionName, categoryName, ...wrapper }
  }
  it('Should render the correct elements on screen', () => {
    const { queryByText, solutionName, categoryName } = setup({
      link: undefined
    })

    expect(queryByText(categoryName)).toBeInTheDocument()
    expect(queryByText(solutionName)).toBeInTheDocument()
  })

  it('Should call handleClick when a solution is clicked', () => {
    const { solutionName, getByText, handleClick } = setup({
      link: undefined
    })

    fireEvent.click(getByText(solutionName))

    expect(handleClick).toHaveBeenCalledWith({
      nome: solutionName,
      tipoRenderizacao: 'microfrontend',
      url: ''
    })
  })
})
