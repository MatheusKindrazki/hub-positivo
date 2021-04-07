import qs from 'qs'

import { apiEEMAuth, apiEEMInfos } from '@psdhub/api'

import {
  EEMConnectPost,
  EEMConnectGET,
  EEMProps,
  EEMPropsInfo
} from '~/services/eemConnect'

const mockedPostData: EEMProps = {
  endpoint: 'testpoint',
  data: {
    grant_type: 'change_school',
    access_token: 'this token is a test',
    refresh_token: 'this refresh token is a test',
    school_id: 'this is not an id, this is a test',
    password: 'nope, test',
    username: 'testname'
  }
}

interface T {
  test: boolean
}

const mockedGetData: EEMPropsInfo<T> = {
  endpoint: 'testpoint',
  token: 'this token is a test',
  data: {
    test: true
  }
}
describe('EEMConnectPost should work properly', () => {
  afterEach(() => jest.resetAllMocks())

  it('EEMConnectPost should set headers then send a post request', () => {
    const postSpy = jest.spyOn(apiEEMAuth, 'post')
    const setHeadersSpy = jest.spyOn(apiEEMAuth, 'post')
    const stringfiedData = qs.stringify(mockedPostData.data)

    EEMConnectPost(mockedPostData)

    expect(setHeadersSpy).toHaveBeenCalled()
    expect(postSpy).toHaveBeenCalledWith(
      mockedPostData.endpoint,
      stringfiedData
    )
  })

  it('EEMConnectGET should send a get request', async () => {
    const { endpoint, data, token } = mockedGetData
    const mockedHeaders = { headers: { Authorization: token } }

    const getSpy = jest.spyOn(apiEEMInfos, 'get')

    EEMConnectGET(mockedGetData)

    expect(getSpy).toHaveBeenCalledWith(endpoint, data, mockedHeaders)
  })
})
