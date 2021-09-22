import React from 'react'

import { render } from '@psdhub/test-utils'

import {
  Option
  // OptionCheckboxProps,
  // PropsSelect
} from '../../../../components/Select/variants/Checkbox'

describe('', () => {
  // const setup = () => {
  //   const wrapper = render(<HubSelectCheckbox />)
  //   return { ...wrapper }
  // }

  const optionSetup = (props: {
    label?: string
    data?: { divider: boolean }
  }) => {
    const children = 'children'

    return render(
      <Option
        {...(props as any)}
        innerProps={{
          id: 'id',
          key: 'key',
          onClick: jest.fn(),
          onMouseMove: jest.fn(),
          onMouseOver: jest.fn(),
          tabIndex: 1
        }}
        setValue={jest.fn()}
        getValue={jest.fn()}
        hasValue={true}
        getStyles={jest.fn()}
        clearValue={jest.fn()}
        isSelected={true}
        isMulti={false}
        isRtl={true}
        isDisabled={false}
        type={'option'}
        cx={jest.fn()}
        options={[]}
        selectProps={{}}
        isFocused={false}
        selectOption={jest.fn()}
        theme={{
          colors: {},
          borderRadius: 1,
          spacing: { baseUnit: 1, controlHeight: 1, menuGutter: 1 }
        }}
        innerRef={jest.fn()}
      >
        {children}
      </Option>
    )
  }
  it('Should render Option with all props', () => {
    const { queryByText } = optionSetup({
      label: 'label',
      data: { divider: true }
    })

    expect(queryByText('label')).toBeInTheDocument()
  })

  it('Should render Option with all props', () => {
    const { queryByText } = optionSetup({})

    expect(queryByText('label')).not.toBeInTheDocument()
  })
})
