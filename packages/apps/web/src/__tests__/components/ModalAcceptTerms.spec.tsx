import React from 'react'

import * as router from 'react-router-dom'
import MatchMediaMock from 'jest-matchmedia-mock'

import * as redux from 'react-redux'

import { acceptTermsRequest } from '~/store/modules/acceptTerms/actions'
import { store } from '~/store'

import { render, fireEvent } from '@psdhub/test-utils'
import * as hooks from '@psdhub/common/hooks'

import history from '~/services/history'

import ModalAcceptTerms from '~/components/ModalAcceptTerms'

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(() => ({ pathname: 'mocked-path' }))
  }
})

describe('ModalAcceptTerms component should work properly', () => {
  beforeEach(() => jest.clearAllMocks())
  const onClose = jest.fn()
  const onOpen = jest.fn()

  jest.spyOn(hooks, 'useDisclosure').mockReturnValue({
    isOpen: true,
    onClose,
    onOpen
  } as any)

  it('Should match snapshot by default', () => {
    const wrapper = render(<ModalAcceptTerms />, {
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

    const wrapper = render(<ModalAcceptTerms />, {
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

    const { getByText } = render(<ModalAcceptTerms />, {
      store: store,
      reducers: ['acceptTerms'],
      CUSTOM_STATE: {
        acceptTerms: {
          accepted: false,
          checking: false
        }
      }
    })

    const checkboxText =
      'Li e aceito os termos do Aviso de Privacidade e Política de Privacidade'

    expect(getByText(checkboxText, { exact: false })).toBeInTheDocument()

    fireEvent.click(getByText(checkboxText, { exact: false }))

    expect(getByText('CONTINUAR')).toBeInTheDocument()

    fireEvent.click(getByText('CONTINUAR'))

    expect(dispatch).toHaveBeenCalledWith(acceptTermsRequest())
  })
  it('should close modal when submitted with checkbox unchecked', async () => {
    const { getByText } = render(<ModalAcceptTerms />, {
      store: store,
      reducers: ['acceptTerms'],
      CUSTOM_STATE: {
        acceptTerms: {
          accepted: false,
          checking: false
        }
      }
    })

    expect(getByText('CANCELAR')).toBeInTheDocument()

    fireEvent.click(getByText('CANCELAR'))

    expect(onClose).toHaveBeenCalled()
  })
  it('should close modal when pathname is on ignore list', async () => {
    const IGNORE_PATH = '/politica-de-privacidade'

    jest.spyOn(router, 'useLocation').mockReturnValueOnce({
      pathname: IGNORE_PATH
    } as any)

    render(<ModalAcceptTerms />, {
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
    render(<ModalAcceptTerms />, {
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

    const { getByRole } = render(<ModalAcceptTerms />, {
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

    render(<ModalAcceptTerms />, {
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
