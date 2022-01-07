import React from 'react'

import { fireEvent } from '@testing-library/dom'

import { store } from '~/store'

import { render } from '@psdhub/test-utils'
import { Drawer } from '@psdhub/common/components'

import { MenuFooter } from '~/components/MenuBar/components'

describe('MenuFooter should work properly', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const setup = (guid: string) => {
    const handleSignOut = jest.fn()
    const openModalPass = jest.fn()
    const openModalVersionUpdate = jest.fn()
    const redirectToMyClasses = jest.fn()
    const wrapper = render(
      <Drawer isOpen={true} onClose={jest.fn()}>
        <MenuFooter
          redirectToMyClasses={redirectToMyClasses}
          handleSignOut={handleSignOut}
          openModalPass={openModalPass}
          openModalVersionUpdate={openModalVersionUpdate}
        />
      </Drawer>,
      {
        store: store,
        reducers: ['profile'],
        CUSTOM_STATE: {
          profile: {
            guid: guid
          }
        }
      }
    )
    return {
      handleSignOut,
      openModalPass,
      openModalVersionUpdate,
      redirectToMyClasses,
      ...wrapper
    }
  }
  it('Should render the correct elements on screen', () => {
    const { queryByText } = setup('ALUNO')
    const signOut = queryByText(/sair/i)
    const modalPass = queryByText(/alterar minha senha/i)

    expect(signOut).toBeInTheDocument()
    expect(modalPass).toBeInTheDocument()
  })

  it('Should should call the handlers functions when its buttons is clicked', () => {
    const { getByText, openModalPass, handleSignOut, redirectToMyClasses } =
      setup('PROFESSOR')
    const signOut = getByText(/sair/i)
    const modalPass = getByText(/alterar minha senha/i)
    const myClasses = getByText(/Minhas turmas/)

    fireEvent.click(myClasses)
    expect(redirectToMyClasses).toHaveBeenCalled()

    fireEvent.click(signOut)
    expect(handleSignOut).toHaveBeenCalled()

    fireEvent.click(modalPass)
    expect(openModalPass).toHaveBeenCalled()
  })
})
