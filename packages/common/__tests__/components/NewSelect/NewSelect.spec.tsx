import React from 'react'

import { render } from '@psdhub/test-utils'
import { Box } from '@psdhub/common/components'

import NewSelect, { SelectProps } from '../../../components/NewSelect/'
describe('NewSelects component should work properly', () => {
  const setup = (props: SelectProps) =>
    render(
      <Box>
        <NewSelect {...props} />
      </Box>
    )

  beforeEach(() => jest.useFakeTimers())

  it('Should render /selecione/ on input', async () => {
    const { queryByText } = setup({
      options: [],
      variant: 'normal',
      clearable: true
    })

    expect(queryByText('selecione', { exact: false })).toBeInTheDocument()
  })

  it('Should render /Selecione/ even when variant is null', async () => {
    const { queryByText } = render(
      <Box>
        <NewSelect variant={null as any} options={[]} defaultIsOpen={true} />
      </Box>
    )

    expect(queryByText('selecione', { exact: false })).toBeInTheDocument()
  })
})
