import React from 'react'

import { render } from '@psdhub/test-utils'

import { Accordion, UnmountClosed } from '../../components/Accordion'

describe('Accordion an UnmountClosed components', () => {
  it('Accordion being rendered on canvas', () => {
    const wrapper = render(<Accordion isOpened>hub</Accordion>)
    expect(wrapper).toMatchSnapshot()
  })

  it('UnmountClosed being rendered on canvas', () => {
    const wrapper = render(<UnmountClosed isOpened>hub</UnmountClosed>)

    expect(wrapper).toMatchSnapshot()
  })
})
