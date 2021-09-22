import React from 'react'

import { render } from '@psdhub/test-utils'
import * as hooks from '@psdhub/common/hooks'
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

  it('Should render /ContainerOptions/ when isOpen is true', async () => {
    jest
      .spyOn(hooks, 'useDisclosure')
      .mockImplementation(
        () => ({ isOpen: true, onToggle: jest.fn(), onClose: jest.fn() } as any)
      )
    const { queryByTestId } = render(
      <Box>
        <NewSelect variant={null as any} options={[]} />
      </Box>
    )

    expect(queryByTestId('container-options')).toBeInTheDocument()
  })
})
