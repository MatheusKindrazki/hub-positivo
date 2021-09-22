import React, { RefObject } from 'react'

import * as dateFns from 'date-fns'
import { FormHandles } from '@unform/core'

import { render, fireEvent } from '@psdhub/test-utils'

import Datepicker from '../../../components/Form/Datepicker'
import { Form } from '../../../components/Form'
import * as DatepickerHub from '../../../components/Datepicker'

jest.mock('date-fns', () => ({
  isDate: jest.fn(),
  format: jest.fn()
}))

jest.mock('@chakra-ui/react', () => {
  const rest = jest.requireActual('@chakra-ui/react')

  return {
    ...rest,
    Popover: jest.fn(({ children }) => (
      <section data-testid="popover-mock">{children}</section>
    )),
    PopoverTrigger: jest.fn(({ children }) => (
      <section data-testid="popover-trigger-mock">{children}</section>
    )),
    PopoverContent: jest.fn(({ children }) => (
      <section data-testid="popover-content-mock">{children}</section>
    ))
  }
})

jest.mock('../../../components/Datepicker', () => {
  const rest = jest.requireActual('../../../components/Datepicker')
  return {
    ...rest,
    __esModule: true,
    default: jest.fn(({ onChange }: { onChange: (dates: any) => void }) => (
      <button
        data-testid="datepicker-calendar"
        onClick={() => {
          onChange([new Date(2021, 10, 11), new Date(2021, 10, 10)])
        }}
      >
        Datepicker Hub
      </button>
    ))
  }
})

interface SetupProps {
  hideSelected?: boolean
  placeholder?: string
  setupRef?: RefObject<FormHandles>
}

describe('Datepicker should work properly', () => {
  const startDate = new Date(2021, 10, 11)
  const endDate = new Date(2021, 10, 10)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const setup = (props: SetupProps | undefined) => {
    const datepickerName = 'datepickerName'
    const onSubmit = jest.fn()

    const wrapper = render(
      <Form onSubmit={onSubmit}>
        <Datepicker name={datepickerName} {...props} />
      </Form>
    )
    return { ...wrapper }
  }

  it('Should render popovers on screen with correct content', () => {
    const { queryByTestId } = setup(undefined)

    expect(queryByTestId('popover-mock')).toBeInTheDocument()
    expect(queryByTestId('popover-trigger-mock')).toBeInTheDocument()
    expect(queryByTestId('popover-content-mock')).toBeInTheDocument()
  })

  it('should handle (handleRenderValue) with selected dates and isDate returns true', () => {
    const spyIsDate = jest.spyOn(dateFns, 'isDate').mockReturnValue(true)
    const spyFormat = jest.spyOn(dateFns, 'format').mockReturnValue('date')

    const { getByTestId } = setup(undefined)

    fireEvent.click(getByTestId('datepicker-calendar'))

    expect(spyIsDate).toHaveBeenNthCalledWith(1, startDate)
    expect(spyIsDate).toHaveBeenNthCalledWith(2, endDate)

    expect(spyFormat).toHaveBeenNthCalledWith(1, startDate, 'dd/MM/yyyy')
    expect(spyFormat).toHaveBeenNthCalledWith(2, endDate, 'dd/MM/yyyy')
  })

  it('should handle  (handleRenderValue) with selected dates and isDate returns false', () => {
    const spyIsDate = jest.spyOn(dateFns, 'isDate').mockReturnValue(false)
    const spyFormat = jest.spyOn(dateFns, 'format').mockReturnValue('date')

    const { getByTestId } = setup(undefined)

    fireEvent.click(getByTestId('datepicker-calendar'))

    expect(spyIsDate).toHaveBeenNthCalledWith(1, startDate)
    expect(spyIsDate).toHaveBeenNthCalledWith(2, endDate)

    expect(spyFormat).not.toHaveBeenCalled()
  })

  it('should not handle  (handleRenderValue) with selected dates if start date and end date is null', () => {
    const spyIsDate = jest.spyOn(dateFns, 'isDate')
    const spyFormat = jest.spyOn(dateFns, 'format')
    jest.spyOn(DatepickerHub, 'default').mockImplementation(
      jest.fn(({ onChange }: { onChange: (dates: any) => void }) => (
        <button
          data-testid="datepicker-calendar"
          onClick={() => {
            onChange([null, null])
          }}
        >
          Datepicker Hub
        </button>
      )) as any
    )
    const { getByTestId } = setup(undefined)
    fireEvent.click(getByTestId('datepicker-calendar'))

    expect(spyIsDate).not.toHaveBeenCalled()
    expect(spyFormat).not.toHaveBeenCalled()
  })

  it('should not handle (handleRenderValue) with selected dates if hideSelected is true', () => {
    const spyIsDate = jest.spyOn(dateFns, 'isDate')
    const spyFormat = jest.spyOn(dateFns, 'format')

    jest.spyOn(DatepickerHub, 'default').mockImplementation(
      jest.fn(({ onChange }: { onChange: (dates: any) => void }) => (
        <button
          data-testid="datepicker-calendar"
          onClick={() => {
            onChange([startDate, endDate])
          }}
        >
          Datepicker Hub
        </button>
      )) as any
    )
    const { getByTestId } = setup({ hideSelected: true, placeholder: '' })
    fireEvent.click(getByTestId('datepicker-calendar'))

    document.createElement = jest.fn()

    expect(spyIsDate).not.toHaveBeenCalled()
    expect(spyFormat).not.toHaveBeenCalled()
  })
})
