import React from 'react'
import '@testing-library/jest-dom'

import { render } from '@hub/test-utils'

import Collapse from '../../components/Collapse'
import { CollapseProps as propTypes } from '../../components/Collapse'

const CollapseProps: propTypes = {
  id: 'teste',
  cor: 'teste',
  nome: 'nome teste do header'
}

jest.mock('@chakra-ui/react', () => {
  const ui = jest.requireActual('@chakra-ui/react')
  return {
    ...ui,
    useDisclosure: jest
      .fn()
      .mockReturnValueOnce({
        isOpen: true,
        onToggle: jest.fn()
      })
      .mockReturnValue({
        isOpen: false,
        onToggle: jest.fn()
      })
  }
})

describe('Collapse component should work properly', () => {
  it('Collapse muda o estilo do componente box com isOpen true', () => {
    const { queryByTestId } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const collapseBox = queryByTestId('collapse-box')
    expect(collapseBox?.style.transform).toBe('rotate(-180deg)')
  })

  it('Collapse renderiza nome dentro do Heading', () => {
    const { getByText } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const header = getByText('nome teste do header')
    expect(header).toBeInTheDocument()
  })

  it('Collapse nao renderiza componente box se disable for true', () => {
    CollapseProps.disable = true
    const { queryByTestId } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const collapseBox = queryByTestId('collapse-box')
    expect(collapseBox).toBe(null)
  })

  it('Collapse sem grid nao usa SimpleGrid', () => {
    CollapseProps.grid = false
    const { queryByTestId } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const collapseBox = queryByTestId('simple-grid')
    expect(collapseBox).toBe(null)
  })

  it('Collapse usa numero correto de colunas no SimpleGrid', () => {
    CollapseProps.grid = true
    CollapseProps.disable = false
    jest.mock('@chakra-ui/react', () => {
      const ui = jest.requireActual('@chakra-ui/react')
      return {
        ...ui,
        useMediaQuery: jest.fn().mockReturnValueOnce([
          function isLargerThan1280() {
            return true
          }
        ])
      }
    })

    const { queryByTestId } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const collapseBox = queryByTestId('simple-grid')
    expect(collapseBox).toBeInTheDocument()
  })

  it('Collapse usa numero correto de colunas no SimpleGrid', () => {
    CollapseProps.grid = true
    CollapseProps.disable = false
    jest.mock('@chakra-ui/react', () => {
      const ui = jest.requireActual('@chakra-ui/react')
      return {
        ...ui,
        useMediaQuery: jest.fn().mockReturnValueOnce([
          function isLargerThan1280() {
            return false
          }
        ])
      }
    })

    const { getByTestId } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const collapseBox = getByTestId('simple-grid')
    expect(collapseBox).toBeInTheDocument()
  })
})
