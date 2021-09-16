import React from 'react'

import { fireEvent } from '@testing-library/dom'

import { render } from '@psdhub/test-utils'

import history from '~/services/history'

import Header, { HeaderProps } from '~/components/Header'

describe('Header component should works as expected', () => {
  const spyPush = jest.spyOn(history, 'push')

  const mockedProps = {
    handleSignOut: jest.fn(),
    handleEducationalStageSwitch: jest.fn(),
    schoolName: 'test-school',
    educationalLevels: ['TEST1', 'TEST2', 'TEST3'],
    selectedLevel: 'TEST2'
  }

  const setup = (props?: Partial<HeaderProps>) =>
    render(<Header {...{ ...mockedProps, ...props }} />)

  it('should render without crashing', () => {
    const { getByText } = setup()

    const welcomeText = 'test-school'

    expect(getByText(welcomeText, { exact: false })).toBeInTheDocument()
  })

  it('buttons should be rendering without crashing', () => {
    const { getByTestId } = setup()

    const buttonsTestIds = ['logo-button']

    buttonsTestIds.forEach(testId =>
      expect(getByTestId(testId)).toBeInTheDocument()
    )

    buttonsTestIds.forEach(testId => fireEvent.click(getByTestId(testId)))

    expect(spyPush).toHaveBeenCalledWith('/')
  })
})
