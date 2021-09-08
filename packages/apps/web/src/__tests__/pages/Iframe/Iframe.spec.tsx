import React from 'react'

import { render } from '@psdhub/test-utils'

import Iframe from '~/pages/Solutions/components/Iframe'

it('iframe should work as expected', () => {
  const wrapper = render(<Iframe />)
  expect(wrapper).toMatchSnapshot()
})
