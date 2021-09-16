import React from 'react'

import { fireEvent } from '@testing-library/dom'

import { render } from '@psdhub/test-utils'
import { Drawer } from '@psdhub/common/components'

import { MenuHeader } from '~/components/MenuBar/components'

describe('MenuHeader should work properly', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const setup = ({ closeButton }: { closeButton: boolean }) => {
    const onClose = jest.fn()
    const name = 'header name'

    const wrapper = render(
      <Drawer isOpen={true} onClose={jest.fn()}>
        <MenuHeader closeButton={closeButton} name={name} onClose={onClose} />
      </Drawer>
    )
    return { onClose, name, ...wrapper }
  }
  it('Should render the correct elements on screen', () => {
    const { queryByText, name, getAllByRole } = setup({ closeButton: true })
    const headerName = queryByText(name)
    const buttons = getAllByRole('button')

    expect(headerName).toBeInTheDocument()
    expect(buttons.length).toEqual(1)
  })

  it('Should call onClose function when /X/ button is clicked', () => {
    const { getAllByRole, onClose } = setup({ closeButton: true })
    const buttons = getAllByRole('button')

    fireEvent.click(buttons[0])

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
