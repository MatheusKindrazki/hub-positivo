import React from 'react'

import { fireEvent, render, waitFor } from '@psdhub/test-utils'
import { Box } from '@psdhub/common/components'

import * as context from '../../../components/NewSelect/context'
import Input, {
  InputProps
} from '../../../components/NewSelect/components/Input'

describe('NewSelects Input component should work properly', () => {
  const mockedSearchable = jest.fn()

  jest.spyOn(context, 'useSelect').mockReturnValue({
    searchable: mockedSearchable
  } as any)

  const setup = (props: InputProps) =>
    render(
      <Box>
        <Input {...props} />
      </Box>
    )

  beforeEach(() => jest.useFakeTimers())

  it('should search at onChange', async () => {
    const { getByTestId } = setup({ placeholder: 'teste' })

    expect(getByTestId('search-input')).toBeInTheDocument()

    await waitFor(() =>
      fireEvent.change(getByTestId('search-input'), {
        target: { value: 'test-value' }
      })
    )

    jest.runAllTimers()

    expect(mockedSearchable).toHaveBeenCalledWith('test-value')
  })
})
