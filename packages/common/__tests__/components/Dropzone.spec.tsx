import React, { useRef } from 'react'

import { renderHook } from '@testing-library/react-hooks'

import { render } from '@psdhub/test-utils'

import Dropzone, { DropzoneHandlers } from '../../components/Dropzone'

describe('Dropzone should work properly', () => {
  it('Dropzone should match snapshot', () => {
    const {
      result: { current: ref }
    } = renderHook(() => useRef<DropzoneHandlers>())

    const wrapper = render(
      <Dropzone
        ref={ref as any}
        error="erro"
        preview={{ fileName: 'filename', url: 'url' }}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
