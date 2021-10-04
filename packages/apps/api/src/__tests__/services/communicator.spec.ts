import { sample } from 'lodash'

import {
  getInstance,
  setAuthorization,
  Variant,
  communicationURLs
} from '../../services/communicators'

describe('API Communicators', () => {
  it('should get an instance of the communicator', () => {
    const communicator = getInstance()
    expect(communicator).toBeDefined()
  })

  it('Should set Authorization header', () => {
    const communicator = getInstance()
    setAuthorization('test')
    expect(communicator.headers.Authorization).toBe('Bearer test')
  })

  it('Should set Authorization all APIs', () => {
    setAuthorization('test', 'all')

    const randomKey = sample(Object.keys(communicationURLs)) as Variant

    const communicator = getInstance(randomKey)
    expect(communicator.headers.Authorization).toBe('Bearer test')
  })
})
