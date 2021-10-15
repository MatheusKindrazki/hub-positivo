import React from 'react'

import { StepsTour } from '~/store/modules/tour/types'
import { store } from '~/store'

import { render, CustomState, fireEvent, waitFor } from '@psdhub/test-utils'

import * as mixpanel from '~/services/mixpanel/setProperties'
import history from '~/services/history'

import Dashboard from '~/layouts/Logged'

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => ({
    pathname: '/'
  }))
}))
jest.mock('~/hooks/useNotifications', () => jest.fn())

jest.mock('~/components/Header', () =>
  jest.fn(props => (
    <div onClick={() => props.handleGoBack()} id="header">
      Header
    </div>
  ))
)

jest.mock('~/components/ModalNoClass', () =>
  jest.fn(() => <div id="modalNoClass">Modal no Class</div>)
)

jest.mock('~/components/ModalAcceptTerms', () =>
  jest.fn(() => <div id="modal">Modal</div>)
)

jest.mock('~/components/ModalAcceptTerms', () =>
  jest.fn(() => <div id="modal">Modal</div>)
)

jest.mock('~/components/ModalAcceptTerms', () =>
  jest.fn(() => <div id="modal">Modal</div>)
)

jest.mock('lodash', () => {
  const rest = jest.requireActual('lodash')
  return {
    ...rest,
    debounce: (callbackFunction: () => void) => () => callbackFunction()
  }
})

jest.mock('~/services/mixpanel/setProperties', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('~/components/Footer', () => ({
  __esModule: true,
  default: () => <span>Footer</span>
}))

jest.mock('~/components/ModalAlternativeAccess', () => ({
  __esModule: true,
  default: () => <span>Modal Alternative Access</span>
}))

describe('Logged`s layout should render without crashing', () => {
  let steps: StepsTour[] = []

  beforeAll(() => {
    steps = [
      { content: first_step, position: 'top', selector: '#modal' },
      { content: second_step, position: 'right', selector: '#header' }
    ]
  })

  const setup = (
    children = '',
    CUSTOM_STATE = {} as CustomState<Store.State>
  ) => {
    const wrapper = render(<Dashboard>{children}</Dashboard>, {
      store,
      reducers: ['global', 'user', 'tour', 'noBreakAccess'],
      CUSTOM_STATE: {
        user: {
          school: {
            value: 'escola-teste',
            label: 'Escola Teste',
            user_id: 'test-id',
            roles: ['teste']
          }
        },
        noBreakAccess: { nobreak: false },
        ...CUSTOM_STATE
      }
    })
    return { ...wrapper }
  }

  const first_step = 'first_step'
  const second_step = 'second_step'

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should call /setUserProperties/ in useEffect', () => {
    jest.useFakeTimers()
    const spySetProperties = jest.spyOn(mixpanel, 'default')
    setup('', {
      tour: {
        open: false,
        steps
      }
    })
    jest.runAllTimers()

    expect(spySetProperties).toHaveBeenCalledTimes(1)
  })

  it('Should call render children on screen', () => {
    const element = 'children'
    const { getByText } = setup(element, { noBreakAccess: { nobreak: false } })

    expect(getByText(element, { exact: false })).toBeInTheDocument()
  })

  it('Shouldn`t call steps if `open` is false', () => {
    const { queryByText } = setup('children', {
      tour: {
        open: false,
        steps
      },
      noBreakAccess: { nobreak: false }
    })

    const firstStep = queryByText(first_step)
    const secondStep = queryByText(second_step)

    expect(firstStep).toBeNull()
    expect(secondStep).toBeNull()
  })

  it('Steps should work properly on Dashboard when `open` and `viewed` are true', async () => {
    const { getByText, getAllByRole, storeUtils } = setup('children', {
      tour: {
        open: true,
        viewed: true,
        steps
      },
      noBreakAccess: { nobreak: false }
    })

    storeUtils?.clearActions()

    expect(getByText(first_step, { exact: false })).toBeInTheDocument()

    const buttonsOnScreen = getAllByRole('button')
    const rightArrow = buttonsOnScreen[3]

    fireEvent.click(rightArrow)

    expect(getByText(second_step, { exact: false })).toBeInTheDocument()

    storeUtils?.clearActions()

    const closeTour = buttonsOnScreen[4]
    fireEvent.click(closeTour)

    const actions = storeUtils?.getActions()
    expect(actions).toStrictEqual([
      { payload: { open: false }, type: '@tour/OPEN_TOUR' }
    ])
  })
  it('Steps should work properly on Dashboard when `open` is true and `viewed` is false', async () => {
    const { storeUtils, getAllByRole } = setup('children', {
      tour: {
        open: true,
        viewed: false,
        steps
      },
      noBreakAccess: { nobreak: false }
    })

    storeUtils?.clearActions()

    const buttonsOnScreen = getAllByRole('button')
    const closeTour = buttonsOnScreen[4]
    fireEvent.click(closeTour)

    const actions = storeUtils?.getActions()
    expect(actions).toStrictEqual([{ type: '@tour/POST_TOUR' }])
  })

  it('Should render /ModalAlternativeAccess/ component when noBreak is true ', () => {
    const { queryByText } = setup('children', {
      noBreakAccess: {
        nobreak: true
      }
    })

    expect(queryByText(/Modal Alternative Access/i)).toBeInTheDocument()
  })

  it('should return user at goBack button', async () => {
    jest.useFakeTimers()

    const spyPush = jest.spyOn(history, 'push')
    const { getByText } = setup('children')

    expect(getByText('Header')).toBeInTheDocument()
    await waitFor(() => fireEvent.click(getByText('Header')))

    jest.runAllTimers()

    expect(spyPush).toHaveBeenCalledWith('/')
  })
})
