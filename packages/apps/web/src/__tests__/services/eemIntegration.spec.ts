import { ApplicationState } from '~/store/store'
import { store } from '~/store'

import { changeSchool } from '~/services/eemIntegration'
import { EEMConnectPost } from '~/services/eemConnect'

const authInitialState = store.getState().auth
const schoolInitialState = store.getState().user.school
const userInitialState = store.getState().user
const storeInitialState = store.getState()

const mockedInitialState = {
  ...storeInitialState,
  auth: {
    ...authInitialState,
    token: 'teste'
  },
  user: {
    ...userInitialState,
    school: {
      ...schoolInitialState,
      value: 'teste'
    }
  }
}

jest.mock('~/services/eemConnect', () => ({
  EEMConnectPost: jest.fn(() => ({ data: 'test' }))
}))

jest
  .spyOn(store, 'getState')
  .mockReturnValue(mockedInitialState as ApplicationState)

describe('eemIntegration should work properly', () => {
  it('eemIntegration should use store data when no args are received', async () => {
    const mockedProps = {
      endpoint: 'connect/token',
      data: {
        access_token: mockedInitialState.auth.token,
        school_id: mockedInitialState.user.school.value,
        grant_type: 'change_school'
      }
    }

    const response = await changeSchool()

    expect(EEMConnectPost).toHaveBeenCalledWith(mockedProps)
    expect(response).toStrictEqual('test')
  })
})
