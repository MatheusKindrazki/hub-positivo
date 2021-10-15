import React from 'react'

import * as router from 'react-router-dom'
import MatchMediaMock from 'jest-matchmedia-mock'

import * as redux from 'react-redux'

import { signOut } from '~/store/modules/auth/actions'
import { acceptTermsRequest } from '~/store/modules/acceptTerms/actions'
import { store } from '~/store'

import { render, fireEvent } from '@psdhub/test-utils'
import * as hooks from '@psdhub/common/hooks'

import history from '~/services/history'

import ModalAceptTerms from '~/components/ModalAcceptTerms'

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(() => ({ pathname: 'mocked-path' }))
  }
})

describe('ModalAceptTerms component should work properly', () => {
  beforeEach(() => jest.clearAllMocks())
  const onClose = jest.fn()
  const onOpen = jest.fn()

  jest.spyOn(hooks, 'useDisclosure').mockReturnValue({
    isOpen: true,
    onClose,
    onOpen
  } as any)

  it('Should match snapshot by default', () => {
    const wrapper = render(<ModalAceptTerms />, {
      store: store,
      reducers: ['acceptTerms'],
      CUSTOM_STATE: {
        acceptTerms: {
          accepted: false,
          checking: false
        }
      }
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('Should match snapshot on desktop when isDesktop is true', async () => {
    const matchmedia = new MatchMediaMock()

    matchmedia.useMediaQuery('(min-width: 480px)')

    const wrapper = render(<ModalAceptTerms />, {
      store: store,
      reducers: ['acceptTerms'],
      CUSTOM_STATE: {
        acceptTerms: {
          accepted: false,
          checking: false
        }
      }
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('should dispatch acceptTerms action when clicked with checkbox checked', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    const { getByText } = render(<ModalAceptTerms />, {
      store: store,
      reducers: ['acceptTerms'],
      CUSTOM_STATE: {
        acceptTerms: {
          accepted: false,
          checking: false
        }
      }
    })

    expect(
      getByText('Tenho mais de 18 anos', { exact: false })
    ).toBeInTheDocument()

    expect(getByText('CONCLUIR')).toBeInTheDocument()

    fireEvent.click(getByText('Tenho mais de 18 anos', { exact: false }))

    fireEvent.click(getByText('CONCLUIR'))

    expect(dispatch).toHaveBeenCalledWith(acceptTermsRequest())
  })
  it('should sign out user when clicked with checkbox unchecked', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    const { getByText } = render(<ModalAceptTerms />, {
      store: store,
      reducers: ['acceptTerms'],
      CUSTOM_STATE: {
        acceptTerms: {
          accepted: false,
          checking: false
        }
      }
    })

    expect(getByText('CONCLUIR')).toBeInTheDocument()

    fireEvent.click(getByText('CONCLUIR'))

    expect(dispatch).toHaveBeenCalledWith(signOut())
  })
  it('should close modal when pathname is on ignore list', async () => {
    const IGNORE_PATH = '/politica-de-privacidade'

    jest.spyOn(router, 'useLocation').mockReturnValueOnce({
      pathname: IGNORE_PATH
    } as any)

    render(<ModalAceptTerms />, {
      store: store,
      reducers: ['acceptTerms'],
      CUSTOM_STATE: {
        acceptTerms: {
          accepted: false,
          checking: false
        }
      }
    })

    expect(onClose).toHaveBeenCalled()
  })

  it('should open modal when accepted is false and checking is true', async () => {
    render(<ModalAceptTerms />, {
      store: store,
      reducers: ['acceptTerms'],
      CUSTOM_STATE: {
        acceptTerms: {
          accepted: false,
          checking: true
        }
      }
    })

    expect(onOpen).toHaveBeenCalled()
  })

  it('should redirect user whe política de privacidade button is clicked', async () => {
    const spyPush = jest.spyOn(history, 'push')

    const { getByRole } = render(<ModalAceptTerms />, {
      store: store,
      reducers: ['acceptTerms'],
      CUSTOM_STATE: {
        acceptTerms: {
          accepted: false,
          checking: true
        }
      }
    })

    expect(
      getByRole('button', { name: 'política de privacidade' })
    ).toBeInTheDocument()

    fireEvent.click(getByRole('button', { name: 'política de privacidade' }))

    expect(spyPush).toHaveBeenCalledWith('/politica-de-privacidade')
  })

  it('useEffect shouldnt do nothing when pathname is on ignore list and modal is closed', async () => {
    const IGNORE_PATH = '/politica-de-privacidade'

    jest.spyOn(router, 'useLocation').mockReturnValue({
      pathname: IGNORE_PATH
    } as any)

    jest.spyOn(hooks, 'useDisclosure').mockReturnValue({
      isOpen: false,
      onClose: jest.fn(),
      onOpen: jest.fn()
    } as any)

    render(<ModalAceptTerms />, {
      store: store,
      reducers: ['acceptTerms'],
      CUSTOM_STATE: {
        acceptTerms: {
          accepted: false,
          checking: false
        }
      }
    })

    expect(onClose).not.toHaveBeenCalled()
    expect(onOpen).not.toHaveBeenCalled()
  })
})
