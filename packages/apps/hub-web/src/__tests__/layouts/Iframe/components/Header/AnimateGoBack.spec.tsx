import React from 'react'

import { fireEvent, render, waitFor } from '@hub/test-utils'

import AnimateGoBack from '~/layouts/Iframe/components/Header/AnimateGoBack'

// width: 60 : 40

describe('getting started', () => {
  const setup = (width: number) => {
    const onClick = jest.fn()
    const wrapper = render(<AnimateGoBack onClick={onClick} width={width} />)
    return { ...wrapper, onClick }
  }
  it('it', async () => {
    jest.useFakeTimers()
    const { getByTestId, findAllByRole } = setup(60)
    const headerButtons = await findAllByRole('button')
    const hubLogo = getByTestId('hub-logo-testid')

    const arrowLeft = headerButtons[0]

    expect(arrowLeft).not.toBeVisible()

    fireEvent.mouseDown(hubLogo)

    const test = await findAllByRole('button')
    await waitFor(() => expect(test[0]).toBeVisible())
  })
})
