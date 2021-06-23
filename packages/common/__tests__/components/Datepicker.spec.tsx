import React, { useRef } from 'react'

import MatchMediaMock from 'jest-matchmedia-mock'
import { renderHook } from '@testing-library/react-hooks'

import { render, fireEvent, act } from '@psdhub/test-utils'

import Datepicker, { DatepickerHandlers } from '../../components/Datepicker'

describe('Datepicker should work properly', () => {
  const setup = () => {
    const {
      result: { current: ref }
    } = renderHook(() => useRef<DatepickerHandlers>())
    const wrapper = render(<Datepicker ref={ref as any} />)
    return { ref, ...wrapper }
  }

  it('Should select start and end day when days is clicked', () => {
    const { getByText } = setup()
    const startDay = getByText('12')
    fireEvent.click(startDay)
    expect(startDay).toHaveClass('react-datepicker__day--selecting-range-start')

    const endDay = getByText('15')
    fireEvent.click(endDay)

    expect(startDay).toHaveClass('react-datepicker__day--range-start')
    expect(endDay).toHaveClass('react-datepicker__day--range-end')
  })

  it('Should not range when the day clicked is a wrong interval', () => {
    const { getByText } = setup()
    const startDay = getByText('12')
    fireEvent.click(startDay)
    expect(startDay).toHaveClass('react-datepicker__day--selecting-range-start')

    const endDay = getByText('10')
    fireEvent.click(endDay)

    expect(startDay).not.toHaveClass('react-datepicker__day--range-start')
    expect(endDay).not.toHaveClass('react-datepicker__day--range-end')
  })

  it('Should set data and get data through the ref', async () => {
    const { ref } = setup()

    const startDay = 10
    const endDay = 29

    act(() => {
      ref?.current?.setData({
        start: new Date(2090, 1, startDay),
        end: new Date(2090, 1, endDay)
      })
    })

    expect(ref?.current?.getData()).toStrictEqual({
      start: new Date(2090, 1, startDay),
      end: new Date(2090, 1, endDay)
    })
  })

  it('Should  not get data if start or end date does not exist', () => {
    const { ref } = setup()
    const data = ref?.current?.getData()

    expect(data).toBeUndefined()
  })

  it('Should  not set data if start or end date does not exist', () => {
    const { ref } = setup()

    ref?.current?.setData({} as any)

    expect(ref?.current?.getData()).toBeUndefined()
  })

  it('Should  render 2 calendars on desktop page', () => {
    const matchmedia = new MatchMediaMock()

    matchmedia.useMediaQuery('(min-width: 620px)')

    const wrapper = setup()

    const days = wrapper.queryAllByText('20')

    expect(days).not.toBeNull()
    expect(days.length).toBe(2)
  })
})
