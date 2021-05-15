import React from 'react'

import { render } from '@psdhub/test-utils'

import Modal from '../../components/Modal'

const modalProps = {
  title: 'modal',
  footerContent: 'footer',
  isOpen: true,
  onClose: jest.fn(),
  children: 'modalChildren'
}

describe('Modal component should work properly', () => {
  const wrapper = render(<Modal {...modalProps} />)
  const { queryByText } = wrapper
  it('Should render the children on screen with correctly props', () => {
    const children = queryByText(modalProps.children)
    const title = queryByText(modalProps.title)
    const footer = queryByText(modalProps.footerContent)

    expect(children).not.toBeNull()
    expect(title).not.toBeNull()
    expect(footer).not.toBeNull()
  })

  it('Shoudn`t render the component when prop open is false (closed Model)', () => {
    modalProps.isOpen = false
    wrapper.rerender(<Modal {...modalProps} />)
    const children = queryByText(modalProps.children)
    const title = queryByText(modalProps.title)
    const footer = queryByText(modalProps.footerContent)

    expect(children).toBeNull()
    expect(title).toBeNull()
    expect(footer).toBeNull()
  })
})
