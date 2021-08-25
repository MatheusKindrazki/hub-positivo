// import retry from 'axios-retry'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

import apiRetry, { orRetry } from '../../services/retry'

describe('orRetry', () => {
  it('Should return true if the amount of attempt to beat with the expected', async () => {
    jest.setTimeout(12000)

    apiRetry(axios)
    const mock = new MockAdapter(axios as any, { delayResponse: 0 })
    mock.onGet('/').reply(503)

    try {
      await axios.get('/')
    } catch (error) {
      expect(orRetry({ ...error, status: 503 })).toBeTruthy()
    }
  })
  it('Should return false if the amount of attempt does not match expected', async () => {
    apiRetry(axios)

    const mock = new MockAdapter(axios as any, { delayResponse: 0 })
    mock.onGet('/').reply(400)

    try {
      await axios.get('/')
    } catch (error) {
      expect(orRetry({ ...error, status: 400 })).not.toBeTruthy()
    }
  })
})
