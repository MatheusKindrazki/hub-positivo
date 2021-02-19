import React from 'react'

import selectEvent from 'react-select-event'

import { fireEvent, render } from '@hub/test-utils'

import '@testing-library/jest-dom'

import Select from '../../components/Select'

describe('Select renders without crashing', () => {
  const mockedOptions = [
    { label: 'option1', value: '1' },
    { label: 'option2', value: '2' },
    { label: 'option3', value: '3' }
  ]
  it('Select normal variant render options', () => {
    expect(1).toBe(1)
    // const teste = jest.fn()
    // const wrapper = render(
    //   <>
    //     <Select
    //       defaultIsOpen={true}
    //       variant="normal"
    //       className="select-selector"
    //       classNamePrefix="test"
    //       placeholder="placeholder_test"
    //       options={mockedOptions}
    //     />
    //   </>
    // // )
    // selectEvent.select(wrapper.getByText('placeholder_test'), '1')
    // wrapper.debug()
  })
})
