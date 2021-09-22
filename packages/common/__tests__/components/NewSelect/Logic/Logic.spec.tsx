import React, { useRef } from 'react'

import { renderHook } from '@testing-library/react-hooks'

import { render } from '@psdhub/test-utils'

import { SelectRefProps } from '../../../../components/NewSelect/types'
import Logic from '../../../../components/NewSelect/Logic'

describe('NewSelect Logic component should work properly', () => {
  const setup = (value?: string[]) => {
    const {
      result: { current: containerRef }
    } = renderHook(() => useRef<HTMLDivElement>(null))
    const {
      result: { current: selectRef }
    } = renderHook(() => useRef<SelectRefProps>(null))
    const children = 'children'
    const wrapper = render(
      <Logic
        onClose={jest.fn()}
        options={[]}
        containerRef={containerRef}
        selectRef={selectRef}
        variant="checkbox"
        value={value}
      >
        {children}
      </Logic>
    )
    return { ...wrapper, selectRef, containerRef, children }
  }
  it('Should render a children without crashing', () => {
    const { queryByText, children } = setup([''])

    expect(queryByText(children)).toBeInTheDocument()
  })

  it('Should render a children without crashing even when the prop `value` is undefined', () => {
    const { queryByText, children } = setup()

    expect(queryByText(children)).toBeInTheDocument()
  })
})
