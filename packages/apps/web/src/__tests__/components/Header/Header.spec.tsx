import React from 'react'

import { fireEvent } from '@testing-library/dom'

import { store } from '~/store'

import { render, waitFor } from '@psdhub/test-utils'

import Header, { HeaderProps } from '~/components/Header'

describe('Header component should works as expected', () => {
  const mockedProps = {
    handleGoBack: jest.fn(),
    schoolName: 'test-school'
  }

  const setup = (props?: Partial<HeaderProps>) =>
    render(<Header {...{ ...mockedProps, ...props }} />, {
      store,
      reducers: ['educationalStage', 'profile', 'user', 'products'],
      CUSTOM_STATE: {
        profile: { name: 'Professor' },
        educationalStage: {
          levels: [
            { label: 'level 1', value: '1' },
            { label: 'level 2', value: '2' }
          ],
          level: '1'
        }
      }
    })

  it('should render without crashing', () => {
    const { getByText } = setup()

    const welcomeText = 'test-school'

    expect(getByText(welcomeText, { exact: false })).toBeInTheDocument()
  })

  it('buttons should be rendering without crashing', async () => {
    jest.useFakeTimers()
    const { queryAllByTestId, getByTestId } = setup()
    const headerButtonCount = 5
    const buttonTestId = 'header-button'
    const goBackTestId = 'animated-goback'

    expect(queryAllByTestId(buttonTestId).length).toBe(headerButtonCount)

    queryAllByTestId(buttonTestId).forEach(button => fireEvent.click(button))
    await waitFor(() => fireEvent.click(getByTestId(goBackTestId)))

    jest.runAllTimers()

    expect(mockedProps.handleGoBack).toHaveBeenCalled()
  })
})
