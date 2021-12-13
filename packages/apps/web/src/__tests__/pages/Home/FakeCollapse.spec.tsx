import React from 'react'

import { render } from '@psdhub/test-utils'

import * as chakra from '@chakra-ui/react'

import FakeCollapse from '~/components/FakeCollapse'

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useMediaQuery: jest.fn(() => [true]).mockReturnValueOnce([false])
}))

const childrenValue = 'testing children'

const setup = (props?: any) => {
  const utils = render(
    <FakeCollapse id="teste" {...props}>
      {childrenValue}
    </FakeCollapse>
  )
  return {
    ...utils
  }
}

describe('FakeCollapse renders without crashing', () => {
  jest.spyOn(chakra, 'useMediaQuery').mockReturnValue([false])
  it('should have children', () => {
    const { queryByText } = setup()
    const children = queryByText(childrenValue)
    expect(children).toBeInTheDocument()
  })

  it("Collapse with false grid doesn't render SimpleGrid", () => {
    const { queryByTestId } = setup({ grid: false })

    const collapseBox = queryByTestId('simple-grid')
    expect(collapseBox).toBe(null)
  })

  it('renders without crashing on larger screens', () => {
    // mock do useMediaQuery para que 'isLargerThan1280' seja true
    jest.spyOn(chakra, 'useMediaQuery').mockReturnValue([true])
    const { queryByTestId } = setup({ grid: false })

    const collapseBox = queryByTestId('simple-grid')
    expect(collapseBox).toBe(null)
  })
})
