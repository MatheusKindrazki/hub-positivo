import qs from 'qs'

import * as api from '@psdhub/api'

import {
  EEMConnectPost,
  EEMConnectGET,
  EEMProps,
  EEMPropsInfo
} from '~/services/eemConnect'

import { waitFor } from '~/../../../libs/test-utils'

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

jest.mock('@psdhub/api')

describe('EEMConnectPost should work properly', () => {
  const mockedGet = jest.fn()
  const mockedPost = jest.fn()
  const mockedSetHeaders = jest.fn()

  jest.spyOn(api, 'getInstance').mockImplementation(
    () =>
      ({
        get: mockedGet,
        post: mockedPost,
        setHeaders: mockedSetHeaders
      } as any)
  )

  it('EEMConnectPost should set headers then send a post request', () => {
    const stringfiedData = qs.stringify(mockedPostData.data)

    EEMConnectPost(mockedPostData)

    expect(mockedSetHeaders).toHaveBeenCalled()
    expect(mockedPost).toHaveBeenCalledWith(
      mockedPostData.endpoint,
      stringfiedData
    )
  })

  it('EEMConnectGET should send a get request', async () => {
    const { endpoint, data, token } = mockedGetData
    const mockedHeaders = { headers: { Authorization: token } }

    await waitFor(() => EEMConnectGET(mockedGetData))

    expect(mockedGet).toHaveBeenCalledWith(endpoint, data, mockedHeaders)
  })
})
