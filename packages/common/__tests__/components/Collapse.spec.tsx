import React from 'react'

import { render } from '@psdhub/test-utils'

import * as media from '@chakra-ui/react'

import Collapse, { CollapseProps as propTypes } from '../../components/Collapse'

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
  it('Collapse doesnt render collapse-box when disable is true', () => {
    CollapseProps.disable = true
    const { queryByTestId } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const collapseBox = queryByTestId('collapse-box')
    expect(collapseBox).toBe(null)
  })

  it('Collapse change its animation when isOpen is true', () => {
    CollapseProps.disable = false
    const { queryByTestId } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
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
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const collapseBox = queryByTestId('collapse-box')
    expect(collapseBox?.style.transform).toBe('rotate(0deg)')
  })

  it('Collapse render name inside Heading', () => {
    const { queryByText } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const header = queryByText('nome teste do header')
    expect(header).not.toBeNull()
  })

  it('Collapse with false grid doesnt render SimpleGrid', () => {
    CollapseProps.grid = false
    const { queryByTestId } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const collapseBox = queryByTestId('simple-grid')
    expect(collapseBox).toBe(null)
  })

  it('Collapse uses SimpleGrid in large screens', () => {
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
