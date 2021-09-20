import React, { useRef } from 'react'

import { renderHook } from '@testing-library/react-hooks'

import { render } from '@psdhub/test-utils'

import FormControl from '../../../../common/components/FormControl'
import Dropzone, {
  DropzoneHandlers
} from '../../../../common/components/Dropzone'

describe('Dropzone should work properly', () => {
  it('Dropzone should match snapshot', () => {
    const {
      result: { current: ref }
    } = renderHook(() => useRef<DropzoneHandlers>(null))

    const wrapper = render(
      <FormControl onSubmit={jest.fn()}>
        <Dropzone
          ref={ref as any}
          error="erro"
          preview={{ fileName: 'filename', url: 'url' }}
        />
      </FormControl>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
