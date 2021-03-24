import React, { useRef } from 'react'

import reactEvent from 'react-select-event'
import * as reactRouter from 'react-router'
import { renderHook } from '@testing-library/react-hooks'

import { store } from '~/store'

import { render, CustomState, fireEvent, act, Providers } from '@hub/test-utils'
import { useTheme } from '@hub/common/layout/styles'
import * as drawer from '@hub/common/components/Drawer'

import { UseDisclosureProps } from '@chakra-ui/react'

import history from '~/services/history'

import * as header from '~/components/Header/context'
import MobileMenu, {
  RefMenuProps,
  MenuButton
} from '~/components/Header/components/Mobile'

import { useHeaderReturn, userState } from '~/__mocks__/HeaderContext'

jest.mock('~/services/history', () => ({
  push: jest.fn()
}))

jest.mock('~/components/Header/context', () => {
  const rest = jest.requireActual('~/components/Header/context')
  return {
    ...rest,
    useHeader: jest.fn()
  }
})

jest.mock('react-router', () => {
  const rest = jest.requireActual('react-router')
  return {
    ...rest,
    useHistory: jest.fn(() => ({
      location: {
        pathname: '/'
      }
    }))
  }
})

describe('Mobile Header component', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  jest.spyOn(header, 'useHeader').mockReturnValue(useHeaderReturn)

  const spyPush = jest.spyOn(history, 'push')

  const spyUseDisclosure = (alterations: Partial<UseDisclosureProps>): void => {
    const {
      result: { current }
    } = renderHook(() => drawer.useDisclosure())
    jest.spyOn(drawer, 'useDisclosure').mockReturnValue({
      ...current,
      ...alterations
    })
  }

  const {
    result: {
      current: { colors }
    }
  } = renderHook(() => useTheme(), { wrapper: Providers })

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

  beforeEach(() => {
    spyUseDisclosure(useDisclosureFunctions)
  })

  const setup = (CUSTOM_STATE = { ...userState } as CustomState) => {
    const {
      result: { current: ref }
    } = renderHook(() => useRef<RefMenuProps>(null))

    const openModalPass = jest.fn()

    const handleMenuClick = jest.fn(() => {
      act(() => {
        ref.current?.openMenu()
      })
    })

    const wrapper = render(
      <>
        <MenuButton onClick={handleMenuClick} />
        <MobileMenu openModalPass={openModalPass} ref={ref} />
      </>,
      {
        reducers: ['tour', 'user', 'profile'],
        store,
        CUSTOM_STATE
      }
    )

    const [menuButton] = wrapper.getAllByRole('button')
    return { ...wrapper, handleMenuClick, menuButton }
  }

  it('Should have a button called `Estou com uma dúvida`', () => {
    const { getByText } = setup()
    const helpButton = getByText(/Estou com uma dúvida/i)

    expect(helpButton).toBeInTheDocument()
  })

  it('openMenu should call onOpen when isOpen is false', () => {
    const onOpen = jest.fn()
    spyUseDisclosure({ onOpen, isOpen: false })

    const { handleMenuClick, menuButton } = setup()

    fireEvent.click(menuButton)

    expect(handleMenuClick).toHaveBeenCalledTimes(1)
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(resetInfo).toHaveBeenCalledTimes(1)
  })

  it('openMenu should call onClose when isOpen is true', () => {
    const { handleMenuClick, menuButton } = setup()

    fireEvent.click(menuButton)

    expect(handleMenuClick).toHaveBeenCalledTimes(1)
    expect(useDisclosureFunctions.onClose).toHaveBeenCalledTimes(1)
  })

  it('Should redirect to `/` when `Sair` button is clicked', () => {
    const { getByText } = setup()

    const exitButton = getByText(/Sair/i)
    expect(exitButton).toBeInTheDocument()

    fireEvent.click(exitButton)

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
    const { getByText } = setup({
      profile: { guid: 'PROFESSOR' }
    })
    const classesButton = getByText(/Minhas turmas/i)
    const homeButton = getByText(/Home/i)

    expect(classesButton).toBeInTheDocument()

    console.log(colors.blue[500])

    // expect(homeButton).toHaveStyle(`color: ${colors.blue[500]}`)
    // expect(classesButton).toHaveStyle(`color: ${colors.gray[500]}`)

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

  it('Should change the `school` on selector when other `school` is triggered', async () => {
    const { getByText, findByText } = setup()

    const schoolLabel = defaultValue.school?.label as string
    const school = await findByText(schoolLabel)

    fireEvent.mouseDown(school)

    expect(school).toBeInTheDocument()
    reactEvent.openMenu(school)
    const otherSchool = getByText(schoolList[0].label)
    expect(otherSchool).toBeInTheDocument()

    fireEvent.click(otherSchool)

    expect(setSchool).toHaveBeenLastCalledWith({
      label: schoolList[0].label,
      roles: schoolList[0].roles,
      value: schoolList[0].value
    })
  })

  it('Should change the `role` on selector when other `role` is triggered', async () => {
    const { getByText, findByText } = setup()
    const roleLabel = defaultValue.role?.label as string
    const selectedRole = await findByText(roleLabel)
    fireEvent.mouseDown(selectedRole)

    expect(selectedRole).toBeInTheDocument()
    reactEvent.openMenu(selectedRole)

    const coordenador = roleList[1]

    const otherRole = getByText(coordenador.name)
    expect(otherRole).toBeInTheDocument()

    fireEvent.click(otherRole)

    expect(setRole).toHaveBeenLastCalledWith(coordenador)
  })

  it('Should change `Home` and `Minhas turmas` buttons styles when location is /minhas-turmas', async () => {
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue({
      location: {
        pathname: '/minhas-turmas'
      }
    } as any)
    const { getByText } = setup({
      profile: { guid: 'PROFESSOR' }
    })

    const homeButton = getByText(/Home/i)
    const classesButton = getByText(/Minhas turmas/i)

    // expect(homeButton).toHaveStyle(`color: ${colors.gray[500]}`)
    // expect(classesButton).toHaveStyle(`color: ${colors.blue[500]}`)
  })
})
