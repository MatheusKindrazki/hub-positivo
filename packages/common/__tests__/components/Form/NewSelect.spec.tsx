import React from 'react'

import * as unForm from '@unform/core'

import { render } from '@psdhub/test-utils'
import { Box } from '@psdhub/common/components'

import NewSelect, {
  Props as NewSelectProps
} from '../../../components/Form/NewSelect/index'

describe('NewSelects NewSelect component should work properly', () => {
  const mockedRegisterField = jest.fn()

  const setup = (props: NewSelectProps) =>
    render(
      <Box>
        <NewSelect {...props} />
      </Box>
    )

  it('should render without crashing', async () => {
    jest.spyOn(unForm, 'useField').mockReturnValue({
      fieldName: 'test-name',
      defaultValue: ['test-value'],
      registerField: mockedRegisterField
    } as any)

    const wrapper = setup({
      name: 'test-name',
      variant: 'normal',
      options: [{ value: '1', label: 'option 1' }]
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('should render error and label', async () => {
    jest.spyOn(unForm, 'useField').mockReturnValue({
      fieldName: 'test-name',
      defaultValue: ['test-value'],
      registerField: mockedRegisterField,
      error: 'test-error'
    } as any)

    const { getByText } = setup({
      label: 'test-label',
      name: 'test-name',
      variant: 'normal',
      options: [{ value: '1', label: 'option 1' }]
    })

    expect(getByText('test-label')).toBeInTheDocument()

    expect(getByText('test-error')).toBeInTheDocument()
  })
})
