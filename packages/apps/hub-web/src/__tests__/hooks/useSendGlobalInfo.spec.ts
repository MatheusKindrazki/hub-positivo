import { renderHook } from '@testing-library/react-hooks'

import { useSendGlobalInfo } from '~/hooks/useSendGlobalInfo'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => ({
    user: {
      guid: 'guid',
      name: 'username'
    },
    school: 'school',
    name: 'name'
  }))
}))

describe('useSendGlobalInfo hook should work properly', () => {
  it('Global Variable `window.__HUB_USER_INFO__` should be undefined before initialization of useSendGlobalInfo hook', () => {
    expect(window.__HUB_USER_INFO__).toBeUndefined()
  })

  it('Global Variable `window.__HUB_USER_INFO__` should be defined after initialization of useSendGlobalInfo hook', () => {
    renderHook(() => useSendGlobalInfo())
    expect(window.__HUB_USER_INFO__).toBeDefined()
  })
})
