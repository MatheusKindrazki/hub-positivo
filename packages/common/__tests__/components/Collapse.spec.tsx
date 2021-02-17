import React from 'react'
import '@testing-library/jest-dom'

import { render } from '@hub/test-utils'

import Collapse from '../../components/Collapse'
import { CollapseProps as propTypes } from '../../components/Collapse'

const CollapseProps: propTypes = {
  id: 'teste',
  cor: 'teste',
  nome: 'teste',
  disable: false,
  gridColumns: 2,
  grid: true,
  className: 'teste'
}

describe('Collapse component should work properly', () => {
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

    const collapseBox = queryByTestId('collapse-box')
    expect(collapseBox).toBe(null)
  })

  it('Collapse com gridCollums falsy', () => {
    CollapseProps.gridColumns = 12
    const { queryByTestId } = render(
      <Collapse {...CollapseProps}>Children</Collapse>
    )

    const collapseBox = queryByTestId('collapse-box')
    expect(collapseBox).toBe(null)
  })
})
