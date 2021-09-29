import React from 'react'

import { fireEvent } from '@testing-library/dom'

import { render } from '@psdhub/test-utils'

import * as HeaderContext from '~/components/MenuBar/context'
import { SelectProfile } from '~/components/MenuBar/components'

jest.mock('@psdhub/common/components/Select', () => ({
  __esModule: true,
  default: ({
    onChange,
    value
  }: {
    onChange: (e: any) => void
    value: any
  }) => <button onClick={() => onChange(value)}>Select</button>
}))

jest.mock('~/components/MenuBar/context', () => {
  const rest = jest.requireActual('~/components/MenuBar/context')
  return {
    ...rest,
    useHeader: jest.fn(() => ({
      schoolList: [],
      roleList: [],
      setRole: jest.fn(),
      setSchool: jest.fn(),
      defaultValue: { school: 'school', role: 'role' }
    }))
  }
})

describe('SelectProfile should work properly', () => {
  const mockedCloseMenu = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  const setup = () => {
    const wrapper = render(<SelectProfile closeMenu={mockedCloseMenu} />)
    return { ...wrapper }
  }
  it('Should render the correct elements on screen', () => {
    const { queryAllByText } = setup()

    expect(queryAllByText(/select/i).length).toBe(2)
  })

  it('Should setRole and setSchool on click', () => {
    const setRole = jest.fn()
    const setSchool = jest.fn()
    jest.spyOn(HeaderContext, 'useHeader').mockImplementation(
      () =>
        ({
          schoolList: [],
          roleList: [],
          setRole,
          setSchool,
          defaultValue: { school: 'school', role: 'role' }
        } as any)
    )

    const { queryAllByText } = setup()

    fireEvent.click(queryAllByText(/Select/i)[0])
    expect(setSchool).toHaveBeenCalledWith('school')

    fireEvent.click(queryAllByText(/Select/i)[1])
    expect(setRole).toHaveBeenCalledWith('role')
  })
})
