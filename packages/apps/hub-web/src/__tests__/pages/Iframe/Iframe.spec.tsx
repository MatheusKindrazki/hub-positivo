import React from 'react'

import { render } from '@hub/test-utils'

import Iframe from '~/pages/Iframe/components/Iframe'

it('iframe should work as expected', () => {
  const wrapper = render(<Iframe />)
  expect(wrapper).toMatchSnapshot()
})
