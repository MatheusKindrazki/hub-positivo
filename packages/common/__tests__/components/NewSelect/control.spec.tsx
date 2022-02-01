import React, { RefObject, useRef } from 'react'

import { FormHandles } from '@unform/core'
import { renderHook } from '@testing-library/react-hooks'

import { render } from '@psdhub/test-utils'
import NewSelect from '@psdhub/common/components/Form/NewSelect'
import { Form } from '@psdhub/common/components/Form'

import * as utils from '../../../components/NewSelect/utils'
import * as context from '../../../components/NewSelect/context'
import Control, {
  ControleProps
} from '../../../components/NewSelect/components/Control'

describe('NewSelect form Control should work properly', () => {
  const setup = (ref: RefObject<FormHandles>, props: ControleProps) =>
    render(
      <Form ref={ref} onSubmit={jest.fn()}>
        <Control {...props} />
        <NewSelect
          variant="normal"
          name="test-name"
          options={[{ value: 'test', label: 'teste' }]}
        />
      </Form>
    )

  it('should render select message', () => {
    const { getByText } = render(<Control />)
    expect(getByText('Selecione')).toBeInTheDocument()
  })

  it('should render custom placeholder', () => {
    const { getByText } = render(<Control placeholder="teste" focus={true} />)
    expect(getByText('teste')).toBeInTheDocument()
  })

  it('should hide selected options when hideSelected prop is true', () => {
    jest.spyOn(utils, 'getLabelsOrValues').mockReturnValue(['test'])

    const {
      result: { current: ref }
    } = renderHook(() => useRef<FormHandles>(null))

    const { queryByText } = setup(ref, { hideSelected: true })

    expect(queryByText('teste')).toBe(null)
  })

  it('should return count of selected items when hideSelected is true', () => {
    jest.spyOn(utils, 'getLabelsOrValues').mockReturnValue(['test 1', 'test 2'])

    const {
      result: { current: ref }
    } = renderHook(() => useRef<FormHandles>(null))

    const { getByText } = setup(ref, { hideSelected: true })

    expect(getByText('2 itens selecionados')).toBeInTheDocument()
  })

  it('should return selected options ', () => {
    jest.spyOn(utils, 'getLabelsOrValues').mockReturnValue(['selected-option'])

    jest.spyOn(context, 'useSelect').mockReturnValue({
      labelLength: 2,
      searchable: jest.fn(),
      getState: jest.fn(() => ({ raw: [] }))
    } as any)

    const {
      result: { current: ref }
    } = renderHook(() => useRef<FormHandles>(null))

    const { getByText } = setup(ref, {})

    expect(getByText('selected-option')).toBeInTheDocument()
  })

  it('should truncate labels when labelLength is truthy', () => {
    jest.spyOn(utils, 'getLabelsOrValues').mockReturnValue(['selected-option'])

    jest.spyOn(context, 'useSelect').mockReturnValue({
      labelLength: 2,
      searchable: jest.fn(),
      getState: jest.fn(() => ({ raw: [] }))
    } as any)

    const {
      result: { current: ref }
    } = renderHook(() => useRef<FormHandles>(null))

    const { getByText } = setup(ref, {})

    const truncateLabel = 'se...'

    expect(getByText(truncateLabel)).toBeInTheDocument()
  })

  it('should work with badges', () => {
    jest.spyOn(utils, 'getLabelsOrValues').mockReturnValue(['selected-option'])

    jest.spyOn(context, 'useSelect').mockReturnValue({
      labelLength: 2,
      isBadge: true,
      searchable: jest.fn(),
      getState: jest.fn(() => ({ raw: [] }))
    } as any)

    const {
      result: { current: ref }
    } = renderHook(() => useRef<FormHandles>(null))

    const { getByText } = setup(ref, { hideSelected: true })

    const truncateLabel = '1 item selecionado'

    expect(getByText(truncateLabel)).toBeInTheDocument()
  })

  it('should return badges', () => {
    jest.spyOn(utils, 'getLabelsOrValues').mockReturnValue(['selected-option'])

    jest.spyOn(context, 'useSelect').mockReturnValue({
      labelLength: 2,
      isBadge: true,
      searchable: jest.fn(),
      getState: jest.fn(() => ({ raw: [1] }))
    } as any)

    const {
      result: { current: ref }
    } = renderHook(() => useRef<FormHandles>(null))

    const { getByText } = setup(ref, { focus: true })

    const truncateLabel = 'se...'

    expect(getByText(truncateLabel)).toBeInTheDocument()
  })

  it('should work with searchable select', () => {
    jest.spyOn(utils, 'getLabelsOrValues').mockReturnValue(['selected-option'])

    jest.spyOn(context, 'useSelect').mockReturnValue({
      labelLength: 2,
      isSearchable: true,
      isBadge: true,
      searchable: jest.fn(),
      getState: jest.fn(() => ({ raw: [] }))
    } as any)

    const {
      result: { current: ref }
    } = renderHook(() => useRef<FormHandles>(null))

    const { getByPlaceholderText } = setup(ref, { focus: true })

    const placeholderText = 'Digite para buscar'

    expect(getByPlaceholderText(placeholderText)).toBeInTheDocument()
  })
})
