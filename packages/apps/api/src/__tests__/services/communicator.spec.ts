import { sample } from 'lodash'

import {
  getInstance,
  setAuthorization,
  removeAuthorization,
  Variant,
  communicationURLs
} from '../../services/communicators'

describe('API Communicators', () => {
  it('should get an instance of the communicator', () => {
    const communicator = getInstance()
    expect(communicator).toBeDefined()
  })

  describe('Should set and remove Authorization properly', () => {
    it('On default communicator when parameter is ommited', () => {
      const communicator = getInstance()
      setAuthorization('test')
      expect(communicator.headers.Authorization).toBe('Bearer test')

      removeAuthorization()
      expect(communicator.headers.Authorization).toBe(undefined)
    })

    it('On all communicators when "all" parameter is received', () => {
      const defaultCommunicator = getInstance()
      const authCommunicator = getInstance('auth')

      setAuthorization('test', 'all')
      expect(defaultCommunicator.headers.Authorization).toBe('Bearer test')
      expect(authCommunicator.headers.Authorization).toBe('Bearer test')

      removeAuthorization('all')
      expect(defaultCommunicator.headers.Authorization).toBe(undefined)
      expect(authCommunicator.headers.Authorization).toBe(undefined)
    })
  })

  it('Should set Authorization all APIs', () => {
    setAuthorization('test', 'all')

    const randomKey = sample(Object.keys(communicationURLs)) as Variant

    const communicator = getInstance(randomKey)
    expect(communicator.headers.Authorization).toBe('Bearer test')
  })
  it('Should remove specifig Authorization header', () => {
    const communicator = getInstance()
    setAuthorization('test')
    expect(communicator.headers.Authorization).toBe('Bearer test')
  })
})
