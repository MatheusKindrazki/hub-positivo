import React from 'react'

import { fireEvent } from '@testing-library/dom'

import { render } from '@psdhub/test-utils'
import { Drawer } from '@psdhub/common/components'

import { MenuFooter } from '~/components/MenuBar/components'

describe('MenuFooter should work properly', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const setup = () => {
    const handleSignOut = jest.fn()
    const openModalPass = jest.fn()
    const openModalVersionUpdate = jest.fn()
    const wrapper = render(
      <Drawer isOpen={true} onClose={jest.fn()}>
        <MenuFooter
          handleSignOut={handleSignOut}
          openModalPass={openModalPass}
          openModalVersionUpdate={openModalVersionUpdate}
        />
      </Drawer>
    )
    return { handleSignOut, openModalPass, openModalVersionUpdate, ...wrapper }
  }
  it('Should render the correct elements on screen', () => {
    const { queryByText } = setup()
    const signOut = queryByText(/sair/i)
    const modalPass = queryByText(/alterar minha senha/i)

    expect(signOut).toBeInTheDocument()
    expect(modalPass).toBeInTheDocument()
  })

  it('Should should call the handlers functions when its buttons is clicked', () => {
    const { getByText, openModalPass, handleSignOut } = setup()
    const signOut = getByText(/sair/i)
    const modalPass = getByText(/alterar minha senha/i)

    fireEvent.click(signOut)
    expect(handleSignOut).toHaveBeenCalled()

    fireEvent.click(modalPass)
    expect(openModalPass).toHaveBeenCalled()
  })
})
