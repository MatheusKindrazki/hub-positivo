import MockAdapter from 'axios-mock-adapter'

import { getInstance } from '@psdhub/api'

import '~/middlewares/hadReAttempt'

jest.mock('@psdhub/newrelic')
jest.mock('@psdhub/api/src/services/retry')

describe('HadReAttempt Middleware', () => {
  it('It should intercept the API return to fetch the number of attempts', async () => {
    const api = getInstance('default')

    const mock = new MockAdapter(api.axiosInstance)

    mock.onAny().reply((config: any) => {
      config['axios-retry'] = {
        ...config['axios-retry'],
        retryCount: 2
      }

      return config
    })

    const response = (await api.get('/')) as any

    expect(response.config?.['axios-retry'].retryCount).toBe(2)
  })

  it('It should not intercept the API return if the number of attempts is 0', async () => {
    const api = getInstance('default')

    const mock = new MockAdapter(api.axiosInstance)

    mock.onAny().reply((config: any) => {
      config['axios-retry'] = {
        ...config['axios-retry'],
        retryCount: 0
      }

      return config
    })

    const response = (await api.get('/')) as any

    expect(response.config?.['axios-retry'].retryCount).toBe(0)
  })
})
