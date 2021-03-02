import React from 'react'

import { render, fireEvent } from '@hub/test-utils'

import CardBox from '~/pages/Auth/Profile/Components/CardBox'

describe('CardBox Component should work properly', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should render icon with correct titles', () => {
    const role = 'professor'

    const { getByText } = render(<CardBox icon={role} title={role} />)
    const iconElement = getByText(role, { exact: false })
    expect(iconElement).toBeInTheDocument()
  })

  it('Should call onClick when user choises an role', () => {
    const onClick = jest.fn()
    const role = 'inexistente'

    const { getByText } = render(
      <CardBox icon={role as any} title={role} onClick={onClick} />
    )

    const iconElement = getByText(role, { exact: false })
    fireEvent.click(iconElement)

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
