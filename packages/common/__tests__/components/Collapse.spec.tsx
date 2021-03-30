import React from 'react'

import { render } from '@hub/test-utils'

import * as media from '@chakra-ui/react'

import Collapse, { CollapseProps } from '../../components/Collapse'

const collapseProps: CollapseProps = {
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
  it("Collapse doesn't render collapse-box when disable is true", () => {
    collapseProps.disable = true
    const { queryByTestId } = render(
      <Collapse {...collapseProps}>Children</Collapse>
    )

    const collapseBox = queryByTestId('collapse-box')
    expect(collapseBox).toBe(null)
  })

  it('Collapse change its animation when isOpen is true', () => {
    collapseProps.disable = false
    const { queryByTestId } = render(
      <Collapse {...collapseProps}>Children</Collapse>
    )

    const collapseBox = queryByTestId('collapse-box')
    expect(collapseBox?.style.transform).toBe('rotate(-180deg)')
  })

  it('Collapse change its animation when isOpen is false', () => {
    // mockando useDisclosure para retornar isOpen: false
    const { useDisclosure } = media
    const disclosureSpy = jest.spyOn(media, 'useDisclosure')
    disclosureSpy.mockReturnValue({ ...useDisclosure(), isOpen: false })

    const { queryByTestId } = render(
      <Collapse {...collapseProps}>Children</Collapse>
    )

    const collapseBox = queryByTestId('collapse-box')
    expect(collapseBox?.style.transform).toBe('rotate(0deg)')
  })

  it('Collapse render name inside Heading', () => {
    const { getByText } = render(
      <Collapse {...collapseProps}>Children</Collapse>
    )

    const header = getByText('nome teste do header')
    expect(header).toBeInTheDocument()
  })

  it("Collapse with false grid doesn't render SimpleGrid", () => {
    collapseProps.grid = false
    const { queryByTestId } = render(
      <Collapse {...collapseProps}>Children</Collapse>
    )

    const collapseBox = queryByTestId('simple-grid')
    expect(collapseBox).toBe(null)
  })

  it('Collapse uses SimpleGrid in large screens', () => {
    collapseProps.grid = true
    collapseProps.disable = true
    // mockando useMediaQuery para que isLargerThan1280 retorne true
    const mediaQuerySpy = jest.spyOn(media, 'useMediaQuery')
    mediaQuerySpy.mockReturnValue([true])

    const { getByTestId } = render(
      <Collapse {...collapseProps}>Children</Collapse>
    )

    const collapseBox = getByTestId('simple-grid')
    expect(collapseBox.innerHTML).toBe('Children')
  })
})
