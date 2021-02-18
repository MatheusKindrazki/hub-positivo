import React from 'react'
import '@testing-library/jest-dom'

import { render } from '@hub/test-utils'

import * as media from '@chakra-ui/react'

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
    useDisclosure: jest.fn(() => ({ isOpen: true })),
    useMediaQuery: jest.fn(() => [false])
  }
})

describe('Collapse component should work properly', () => {
  it('Collapse nao renderiza componente box se disable for true', () => {
    CollapseProps.disable = true
    const { queryByTestId } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const collapseBox = queryByTestId('collapse-box')
    expect(collapseBox).toBe(null)
  })

  it('Collapse muda animacao com isOpen true', () => {
    CollapseProps.disable = false
    const { queryByTestId } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const collapseBox = queryByTestId('collapse-box')
    expect(collapseBox?.style.transform).toBe('rotate(-180deg)')
  })

  it('Collapse muda animacao com isOpen false', () => {
    // mockando useDisclosure para retornar isOpen: false
    const { useDisclosure } = media
    const disclosureSpy = jest.spyOn(media, 'useDisclosure')
    disclosureSpy.mockReturnValue({ ...useDisclosure(), isOpen: false })

    const { queryByTestId } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const collapseBox = queryByTestId('collapse-box')
    expect(collapseBox?.style.transform).toBe('rotate(0deg)')
  })

  it('Collapse renderiza nome dentro do Heading', () => {
    const { getByText } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const header = getByText('nome teste do header')
    expect(header).toBeInTheDocument()
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
    CollapseProps.disable = true
    // mockando useMediaQuery para que isLargerThan1280 retorne true
    const mediaQuerySpy = jest.spyOn(media, 'useMediaQuery')
    mediaQuerySpy.mockReturnValue([true])

    const { getByTestId } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const collapseBox = getByTestId('simple-grid')
    expect(collapseBox.innerHTML).toBe('Children')
  })
})
