import React from 'react'

import { renderHook } from '@testing-library/react-hooks'

import * as treeUtils from '@psdhub/common/components/Tree/utils'
import * as newSelectUtils from '@psdhub/common/components/NewSelect/utils'

import { SelectContextProps } from '../../../../components/NewSelect/context/types'
import { useCheckedLogic } from '../../../../components/NewSelect/components/Variants/logic'

describe('NewSelects useCheckedLogic should work as expected', () => {
  const mockedContext: SelectContextProps = {
    getState: jest.fn(() => ({
      raw: [{ value: '1', label: 'option 1', isChecked: 2 }]
    })) as any,
    setState: jest.fn(),
    onChange: jest.fn(),
    refresh: jest.fn(),
    searchable: jest.fn(),
    onClose: jest.fn(),
    onInputBlur: jest.fn(),
    onInputFocus: jest.fn(),
    options: [{ value: '1', label: 'option 1' }],
    isMulti: true,
    noOptionsMessage: (<div>test-no-options-message</div>) as any,
    allSelectMessage: 'test-all-select-message'
  }
  const setup = (context = mockedContext) =>
    renderHook(() => useCheckedLogic(context)).result.current

  it('handleClick should work as expected', () => {
    const { handleClick } = setup()
    handleClick(mockedContext.options)

    expect(mockedContext.onChange).toHaveBeenCalledWith(
      ['1'],
      [{ isChecked: 1, label: 'option 1', value: '1' }]
    )
    expect(mockedContext.refresh).toHaveBeenCalled()

    jest.spyOn(treeUtils, 'getObjectValues').mockImplementation(jest.fn())
    const handleParentsSpy = jest
      .spyOn(newSelectUtils, 'handleParents')
      .mockImplementation(jest.fn())

    handleClick({ value: '1', label: 'option 1' })
    expect(handleParentsSpy).toHaveBeenCalledWith(
      [
        {
          isChecked: 2,
          label: 'option 1',
          value: '1'
        }
      ],
      { isChecked: 1, label: 'option 1', value: '1' },
      true
    )
    expect(mockedContext.getState).toHaveBeenCalled()
  })

  it('checkSelectedItem should work as expected', () => {
    const { checkSelectedItem } = setup()

    const result = checkSelectedItem({ value: '1', label: 'option 1' })

    expect(mockedContext.getState).toHaveBeenCalled()
    expect(result).toStrictEqual({
      isChecked: 2,
      label: 'option 1',
      value: '1'
    })
  })

  it('checkSelectedItem should return undefined when no values are equal', () => {
    const { checkSelectedItem } = setup()

    const result = checkSelectedItem({ value: '2', label: 'option 2' })

    expect(mockedContext.getState).toHaveBeenCalled()

    expect(result).toBe(undefined)
  })

  it('checkSelectedItem should return undefined when no values are equal', () => {
    const { checkSelectedItem } = setup()

    const result = checkSelectedItem({ value: '2', label: 'option 2' })

    expect(mockedContext.getState).toHaveBeenCalled()

    expect(result).toBe(undefined)
  })

  it('useCheckedLogic should define searchable', () => {
    const newContext = mockedContext

    newContext.searchable = undefined as any

    setup(newContext)

    newContext.searchable('string')

    expect(mockedContext.getState).toHaveBeenCalled()
  })

  it('searchable should return options when no input is received', () => {
    const newContext = mockedContext

    newContext.searchable = undefined as any

    setup(newContext)

    const result = newContext.searchable(undefined as any)

    expect(mockedContext.getState).toHaveBeenCalled()

    expect(result).toBe(undefined)
  })
})
