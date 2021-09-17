import React from 'react'

import { fireEvent } from '@testing-library/dom'

import { store } from '~/store'

import { render } from '@psdhub/test-utils'

import history from '~/services/history'

import Header, { HeaderProps } from '~/components/Header'

describe('Header component should works as expected', () => {
  const spyPush = jest.spyOn(history, 'push').mockImplementation()

  const mockedProps = {
    handleSignOut: jest.fn(),
    schoolName: 'test-school'
  }

  const setup = (props?: Partial<HeaderProps>) =>
    render(<Header {...{ ...mockedProps, ...props }} />, {
      store,
      reducers: ['educationalStage', 'profile'],
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

  it('buttons should be rendering without crashing', () => {
    const { queryAllByTestId } = setup()
    const headerButtonCount = 6
    const buttonTestId = 'header-button'

    expect(queryAllByTestId(buttonTestId).length).toBe(headerButtonCount)

    queryAllByTestId(buttonTestId).forEach(button => fireEvent.click(button))

    expect(spyPush).toHaveBeenCalledWith('/')
    expect(mockedProps.handleSignOut).toHaveBeenCalled()
  })
})
