import * as router from 'react-router-dom'
import { renderHook } from '@testing-library/react-hooks'

import useQuery from '~/hooks/useQuery'

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn()
}))

describe('useQuery hook should work properly', () => {
  const queryParamer = 'home'

  const useLocationReturn = {
    pathname: '/login',
    search: `?redirect=${queryParamer}`,
    hash: '',
    state: undefined
  }

  jest.spyOn(router, 'useLocation').mockReturnValue(useLocationReturn)

  it('Should return the value of the query provided by the get method', () => {
    const {
      result: { current }
    } = renderHook(() => useQuery())
    expect(current.get('redirect')).toBe(queryParamer)
  })
})
