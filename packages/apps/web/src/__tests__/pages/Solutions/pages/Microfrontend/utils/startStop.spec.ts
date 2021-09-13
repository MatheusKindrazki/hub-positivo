import * as utils from '@psdhub/common/utils'

import * as voidFunction from '~/utils/voidFunction'

import * as startStop from '~/pages/Solutions/pages/Microfrontend/utils/startStop'

jest.mock('@psdhub/common/utils', () => ({
  delay: jest.fn()
}))

describe('startStop functions should work properly', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })
  it('Should call window.loadMicrofrontend when its is true', async () => {
    window.loadMicrofrontend = jest.fn()

    await startStop.startApp()
    expect(window.loadMicrofrontend).toHaveBeenCalledTimes(1)
  })

  it('Should call startApp again when window.loadMicrofrontend is false', async () => {
    window.loadMicrofrontend = undefined

    const spyDelay = jest.spyOn(utils, 'delay').mockImplementation((): any => {
      window.loadMicrofrontend = jest.fn()
    })
    const spyStopApp = jest.spyOn(startStop, 'startApp')

    await startStop.startApp()

    expect(spyStopApp).toHaveBeenCalled()
    expect(spyDelay).toHaveBeenCalledWith(800)
  })
  it('Should call window.unLoadMicrofrontend when its is true', async () => {
    window.unLoadMicrofrontend = jest.fn()

    jest.spyOn(voidFunction, 'voidFunction').mockImplementation(jest.fn())
    const spyDelay = jest.spyOn(utils, 'delay')
    await startStop.stopApp()

    expect(spyDelay).toHaveBeenCalledWith(800)
  })

  it('Should call startApp again when window.unLoadMicrofrontend is false', async () => {
    window.unLoadMicrofrontend = undefined

    const spyDelay = jest.spyOn(utils, 'delay').mockImplementation((): any => {
      window.unLoadMicrofrontend = jest.fn()
    })
    const spyStopApp = jest.spyOn(startStop, 'stopApp')

    await startStop.stopApp()

    expect(spyStopApp).toHaveBeenCalled()
    expect(spyDelay).toHaveBeenCalledWith(800)
  })
})
