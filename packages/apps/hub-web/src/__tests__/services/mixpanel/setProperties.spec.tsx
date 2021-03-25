import React from 'react'

import mixpanel from 'mixpanel-browser'
import { renderHook } from '@testing-library/react-hooks'

import { Provider } from 'react-redux'

import setProperties from '~/services/mixpanel/setProperties'

import { userMock, profilesMock, educationalStageMock } from '~/__mocks__/store'
import store, { mockState } from '~/__mocks__/fakeStore.mock'

jest.mock('mixpanel-browser', () => ({
  people: jest.fn().mockReturnValue({
    set: jest.fn()
  }),
  identify: jest.fn()
}))

const wrapper: React.FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

describe('Mixpanel Services', () => {
  it('Should return undefined if the user is not logged in', () => {
    let resolved: any

    renderHook(() => (resolved = setProperties()), { wrapper })

    expect(resolved).toBeUndefined()
  })

  it.skip('teste', () => {
    mockState.auth = {
      ...mockState.auth,
      signed: true
    }

    mockState.user = {
      ...mockState.user,
      info: userMock.user,
      school: userMock.school
    }

    mockState.profile = {
      ...profilesMock
    }

    mockState.educationalStage = {
      ...educationalStageMock,
      loading: false
    }

    const { set } = mixpanel.people

    renderHook(() => setProperties(), { wrapper })

    expect(set).toBeCalledWith('brasil')
  })
})
