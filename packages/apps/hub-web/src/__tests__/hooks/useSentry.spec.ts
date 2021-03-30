import { renderHook } from '@testing-library/react-hooks'
import * as Sentry from '@sentry/react'

import * as redux from 'react-redux'

import { useSentry } from '~/hooks/useSentry'

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}))

describe('useSentry hook should work properly', () => {
  const setUser = jest.fn()
  const setContext = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('If environment is `production`, this hook should call its methods correctly', () => {
    process.env.REACT_APP_NODE_ENV = 'production'
    const info = {
      guid: 'guid',
      username: 'username',
      email: 'email'
    }

    const school = {
      label: 'label'
    }
    const name = 'name'
    const level = 'level'

    jest.spyOn(Sentry, 'setUser').mockImplementation(setUser)
    jest.spyOn(Sentry, 'setContext').mockImplementation(setContext)
    jest.spyOn(redux, 'useSelector').mockReturnValue({
      info,
      school,
      name,
      level
    })

    renderHook(() => useSentry())

    expect(setUser).toHaveBeenCalledWith({
      email: info.email,
      id: info.guid,
      username: info.username
    })
    expect(setContext).toHaveBeenCalledWith('user_info', {
      educational_stage: level,
      email: info.email,
      id: info.guid,
      role: name,
      school: school.label,
      username: info.username
    })
  })

  it('If environment is not `production`, this hook shouldn`t call its methods', () => {
    process.env.REACT_APP_NODE_ENV = 'develop'
    renderHook(() => useSentry())
    expect(setUser).not.toHaveBeenCalled()
    expect(setContext).not.toHaveBeenCalled()
  })
})
