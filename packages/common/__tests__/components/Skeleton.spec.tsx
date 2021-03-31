import React from 'react'

import { render } from '@hub/test-utils'

import Skeleton, {
  SkeletonProps,
  Skeleton as SkeletonNotDefault,
  SkeletonTextProps,
  SkeletonCircle,
  SkeletonText,
  Stack
} from '../../components/Skeleton'

const skeletonProps: SkeletonProps = {
  height: '20px'
}

const skeletonTextProps: SkeletonTextProps = {
  fontSize: '1em'
}

describe('Skeleton renders without crashing', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockImplementation(() => ({
        addListener: jest.fn(),
        removeListener: jest.fn()
      }))
    })
  })

  it('Stack matches snapshot', () => {
    const wrapper = render(<Stack />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Skeleton matches snapshot', () => {
    const wrapper = render(
      <>
        <Skeleton {...skeletonProps} />
        <SkeletonNotDefault />
      </>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('SkeletonCircle matches snapshot', () => {
    const wrapper = render(<SkeletonCircle />)
    expect(wrapper).toMatchSnapshot()
  })

  it('SkeletonText matches snapshot', () => {
    const wrapper = render(<SkeletonText {...skeletonTextProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
