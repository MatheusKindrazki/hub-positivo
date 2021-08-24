// import retry from 'axios-retry'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

import apiRetry from '../../services/retry'

describe('Api retry', () => {
  it('should ignore the retry if the API status is different from expected', async () => {
    jest.setTimeout(12000)

    apiRetry(axios)

    const mock = new MockAdapter(axios)
    mock.onGet('/').reply(400)

    try {
      await axios.get('/')
    } catch (error) {
      const { response } = error
      const responseConfig = response.config['axios-retry'] as any

      expect(response.status).toBe(400)
      expect(responseConfig.retryCount).toBe(0)
    }
  })
})
