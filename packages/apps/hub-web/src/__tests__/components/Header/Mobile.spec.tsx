import React from 'react'

import { openMenu } from 'react-select-event'
import * as reactRouter from 'react-router'

import { store } from '~/store'

import { render, CustomState, fireEvent, act } from '@psdhub/test-utils'
import ThemeContainer from '@psdhub/common/layout/Provider'
import * as drawer from '@psdhub/common/components/Drawer'

import history from '~/services/history'

import * as header from '~/components/Header/context'
import MobileMenu, { MenuButton } from '~/components/Header/components/Mobile'

import {
  useHeaderReturn,
  userState,
  profileState
} from '~/__mocks__/HeaderContext'

jest.mock('mixpanel-browser')

jest.mock('~/components/Header/context', () => ({
  useHeader: jest.fn(),
  HeaderProvider: jest.fn()
}))

jest.mock('~/services/history', () => ({
  push: jest.fn()
}))

jest.mock('react-router', () => {
  return {
    useHistory: jest.fn(() => ({
      location: {
        pathname: '/'
      }
    }))
  }
})
jest.mock('~/hooks/amplitude/clearAll')

describe('Mobile Header component ', () => {
  jest.spyOn(header, 'useHeader').mockReturnValue(useHeaderReturn)
  const spyPush = jest.spyOn(history, 'push')

  const spyUseDisclosure = (alterations: any): void => {
    jest.spyOn(drawer, 'useDisclosure').mockReturnValue(alterations as any)
  }

  const useDisclosureFunctions = {
    onClose: jest.fn(),
    onOpen: jest.fn(),
    isOpen: true
  }

  const {
    defaultValue,
    resetInfo,
    schoolList,
    roleList,
    setSchool,
    setRole
  } = useHeaderReturn

  afterEach(() => {
    jest.clearAllMocks()
  })

  const ref = {
    current: {
      openMenu: jest.fn()
    }
  }

  const handleMenuClick = jest.fn(() => {
    act(() => {
      ref.current?.openMenu()
    })
  })

  const setup = (CUSTOM_STATE = { ...userState } as CustomState) => {
    const wrapper = render(
      <>
        <MenuButton onClick={handleMenuClick} />
        <MobileMenu openModalPass={jest.fn()} ref={ref} />
      </>,
      {
        reducers: ['tour', 'user', 'profile'],
        store,
        CUSTOM_STATE
      }
    )

    return { ...wrapper, handleMenuClick }
  }

  it('Should call OpenModalPass when `alterar minha senha` is clicked', () => {
    spyUseDisclosure(useDisclosureFunctions)

    const openModalPass = jest.fn()

    const { getByText } = render(
      <ThemeContainer>
        <MenuButton onClick={handleMenuClick} />
        <MobileMenu openModalPass={openModalPass} ref={ref} />
      </ThemeContainer>,
      {
        reducers: ['tour', 'user', 'profile'],
        store,
        CUSTOM_STATE: { user: userState }
      }
    )
    const alterPass = getByText(/Alterar minha senha/i)

    fireEvent.click(alterPass)

    expect(openModalPass).toHaveBeenCalled()
  })

  it('Should have a button called `Estou com uma dúvida`', () => {
    const { queryByText } = setup()
    const helpButton = queryByText(/Estou com uma dúvida/i)

    expect(helpButton).not.toBeNull()
  })

  it('openMenu should call onOpen when isOpen is false', () => {
    const onOpen = jest.fn()
    spyUseDisclosure({ onOpen, isOpen: false })

    const { handleMenuClick, getAllByRole } = setup()
    const [menuButton] = getAllByRole('button')
    fireEvent.click(menuButton)

    expect(handleMenuClick).toHaveBeenCalledTimes(1)
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(resetInfo).toHaveBeenCalledTimes(1)
  })

  it('openMenu should call onClose when isOpen is true', () => {
    spyUseDisclosure(useDisclosureFunctions)

    const { handleMenuClick, getAllByRole } = setup()
    const [menuButton] = getAllByRole('button')
    fireEvent.click(menuButton)

    expect(handleMenuClick).toHaveBeenCalledTimes(1)
    expect(useDisclosureFunctions.onClose).toHaveBeenCalledTimes(1)
  })

  it('Should redirect to `/` when `Sair` button is clicked', () => {
    const { getByText, storeUtils } = setup()

    const exitButton = getByText(/Sair/i)

    fireEvent.click(exitButton)

    const action = storeUtils?.getActions()

    expect(action).toStrictEqual([
      {
        type: '@auth/SIGN_OUT'
      }
    ])

    expect(spyPush).toHaveBeenCalledWith('/')
  })

  it('Should open a Tour (dispatch a `@tour/OPEN_TOUR` action) when /Fazer tour/ button is clicked', () => {
    const { getByText, storeUtils } = setup({
      tour: {
        steps: [
          { content: 'content', position: 'right', selector: '#selector' }
        ]
      }
    })
    const tourButton = getByText(/Fazer tour/i)
    fireEvent.click(tourButton)

    const action = storeUtils?.getActions()

    expect(useDisclosureFunctions.onClose).toHaveBeenCalledTimes(1)
    expect(action).toStrictEqual([
      {
        payload: {
          open: true
        },
        type: '@tour/OPEN_TOUR'
      }
    ])
  })

  it('Should redirect to `/minhas-turmas`when `Minhas turmas` button is clicked', () => {
    const { getByText } = setup(profileState)
    const classesButton = getByText(/Minhas turmas/i)

    fireEvent.click(classesButton)
    expect(spyPush).toHaveBeenCalledWith('/minhas-turmas')
  })

  it('Should call useDisclosure`s onClose function when ´Home` button is clicked', () => {
    const { getByText } = setup()

    const homeButton = getByText(/Home/i)

    fireEvent.click(homeButton)
    expect(useDisclosureFunctions.onClose).toHaveBeenCalledTimes(1)
    expect(spyPush).toHaveBeenCalledWith('/')
  })

  it('Should call useDisclosure`s onClose function when key of escape is pressed (ESC)', () => {
    const { getByTestId } = setup()
    const drawerContent = getByTestId('hub-drawer-content')

    fireEvent.keyDown(drawerContent, { key: 'Esc', code: 27 })

    expect(useDisclosureFunctions.onClose).toHaveBeenCalledTimes(1)
  })

  it('Should change the `school` on selector when other `school` is triggered', () => {
    spyUseDisclosure(useDisclosureFunctions)

    const { getByText } = setup()

    const schoolLabel = defaultValue.school?.label as string
    const school = getByText(schoolLabel)

    fireEvent.mouseDown(school)

    openMenu(school)
    const otherSchool = getByText(schoolList[0].label)
    expect(otherSchool).toBeInTheDocument()

    fireEvent.click(otherSchool)

    expect(setSchool).toHaveBeenLastCalledWith({
      label: schoolList[0].label,
      roles: schoolList[0].roles,
      value: schoolList[0].value
    })
  })

  it('Should change the `role` on selector when other `role` is triggered', () => {
    const { getByText } = setup()
    const roleLabel = defaultValue.role?.label as string
    const selectedRole = getByText(roleLabel)
    fireEvent.mouseDown(selectedRole)

    openMenu(selectedRole)

    const coordenador = roleList[1]

    const otherRole = getByText(coordenador.name)

    fireEvent.click(otherRole)

    expect(setRole).toHaveBeenLastCalledWith(coordenador)
  })

  it('Should match snapshot on `Home` when pathname is `/`', async () => {
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue({
      location: {
        pathname: '/'
      }
    } as any)
    const { getByText } = setup(profileState)
    const homeButton = getByText(/Home/i)
    expect(homeButton).toMatchSnapshot()
  })

  it('Should match snapshot on `Minhas turmas` when pathname is `/minhas-turmas`', () => {
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue({
      location: {
        pathname: '/minhas-turmas'
      }
    } as any)

    const { getByText } = setup(profileState)
    const classes = getByText(/Minhas turmas/i)
    expect(classes).toMatchSnapshot()
  })
})
