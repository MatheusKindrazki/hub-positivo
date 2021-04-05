import React from 'react'

import { StepsTour } from '~/store/modules/tour/types'
import { store } from '~/store'

import { render, CustomState, fireEvent } from '@hub/test-utils'

import Dashboard from '~/layouts/Logged'
import * as sentry from '~/hooks/useSentry'
import * as globalInfo from '~/hooks/useSendGlobalInfo'
import * as amplitude from '~/hooks/amplitude/useAmplitudeSetProperties'

jest.mock('~/hooks/useSentry', () => ({
  useSentry: jest.fn()
}))

jest.mock('~/hooks/useSendGlobalInfo', () => ({
  useSendGlobalInfo: jest.fn()
}))

jest.mock('~/hooks/amplitude/useAmplitudeSetProperties', () => ({
  useAmplitudeSetProperties: jest.fn()
}))

jest.mock('~/components/ModalNoClass', () =>
  jest.fn(() => <div id="modal">Modal</div>)
)

jest.mock('~/components/Header', () =>
  jest.fn(() => <div id="header">Header</div>)
)

describe('Logged`s layout should render without crashing', () => {
  let steps: StepsTour[] = []

  beforeAll(() => {
    steps = [
      { content: first_step, position: 'top', selector: '#modal' },
      { content: second_step, position: 'right', selector: '#header' }
    ]
  })

  const setup = (children = '', CUSTOM_STATE = {} as CustomState) => {
    const wrapper = render(<Dashboard>{children}</Dashboard>, {
      store,
      reducers: ['global', 'tour'],
      CUSTOM_STATE
    })
    return { ...wrapper }
  }

  const first_step = 'first_step'
  const second_step = 'second_step'

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should call render children on screen', () => {
    const element = 'children'
    const { getByText } = setup(element)

    expect(getByText(element, { exact: false })).toBeInTheDocument()
  })

  it('Shouldn`t call steps if `open` is false', () => {
    const { queryByText } = setup('children', {
      tour: {
        open: false,
        steps
      }
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
      }
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
      }
    })

    storeUtils?.clearActions()

    const buttonsOnScreen = getAllByRole('button')
    const closeTour = buttonsOnScreen[4]
    fireEvent.click(closeTour)

    const actions = storeUtils?.getActions()
    expect(actions).toStrictEqual([{ type: '@tour/POST_TOUR' }])
  })

  it('Should call that hooks: useSentry, useSendGlobalInfo and useAmplitudeSetProperties', () => {
    setup()
    const spyUseSentry = jest.spyOn(sentry, 'useSentry')
    const spyGlobalInfo = jest.spyOn(globalInfo, 'useSendGlobalInfo')
    const spyAmplitude = jest.spyOn(amplitude, 'useAmplitudeSetProperties')

    expect(spyUseSentry).toHaveBeenCalledTimes(1)
    expect(spyGlobalInfo).toHaveBeenCalledTimes(1)
    expect(spyAmplitude).toHaveBeenCalledTimes(1)
  })
})
