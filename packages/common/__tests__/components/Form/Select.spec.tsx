import React, { useRef } from 'react'

import { FormHandles } from '@unform/core'
import { renderHook } from '@testing-library/react-hooks'

import { render } from '@psdhub/test-utils'

import Select, { Props } from '../../../components/Form/Select'
import { Form } from '../../../components/Form'

jest.mock('../../../components/Select', () => {
  const rest = jest.requireActual('../../../components/Select')
  return {
    ...rest,
    __esModule: true,
    default: jest.fn(() => (
      <section data-testid="default-select">Default select</section>
    ))
  }
})

jest.mock('@chakra-ui/react', () => {
  const rest = jest.requireActual('@chakra-ui/react')
  return {
    ...rest,
    FormControl: jest.fn(({ children }) => (
      <section data-testid="form-control">{children}</section>
    )),
    FormHelperText: jest.fn(({ children }) => (
      <section data-testid="form-helper-text">{children}</section>
    )),
    FormControlProps: jest.fn(({ children }) => (
      <section data-testid="form-control-props">{children}</section>
    )),
    FormLabel: jest.fn(({ children }) => (
      <section data-testid="form-label">{children}</section>
    ))
  }
})

describe('Select should work properly', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const setup = (props?: Props) => {
    const selectName = 'selectName'
    const onSubmit = jest.fn()
    const {
      result: { current: ref }
    } = renderHook(() => useRef<FormHandles>(null))
    const wrapper = render(
      <Form onSubmit={onSubmit} ref={ref}>
        <Select
          name={selectName}
          variant="secondary"
          label="label"
          {...props}
        />
      </Form>
    )
    return { ...wrapper, onSubmit, ref }
  }

  it('Should render DefaultSelect on screen with correct content', () => {
    const { queryByTestId } = setup()

    expect(queryByTestId('form-control')).toBeInTheDocument()
    expect(queryByTestId('form-label')).toBeInTheDocument()
    expect(queryByTestId('default-select')).toBeInTheDocument()
  })

  it.only('render select', () => {
    setup()
  })
})
