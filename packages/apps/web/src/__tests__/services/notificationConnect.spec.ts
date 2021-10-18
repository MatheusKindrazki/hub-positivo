import { waitFor } from '@psdhub/test-utils'
import * as newRelic from '@psdhub/newrelic'
import * as api from '@psdhub/api'

import { notificationConnect, disconnect } from '~/services/notificationConnect'

jest.mock('@psdhub/newrelic', () => ({
  ...jest.requireActual('@psdhub/newrelic'),
  noticeError: jest.fn()
}))

jest.mock('@psdhub/common/utils', () => ({
  ...jest.mock('@psdhub/common/utils'),
  createSlug: jest.fn(() => 'mocked-slug')
}))

jest.mock('@psdhub/api', () => ({
  ...jest.requireActual('@psdhub/api'),
  createHubConnect: jest.fn(() => ({
    off: jest.fn(),
    stop: jest.fn(),
    on: jest.fn()
  })),
  stringSubscriptions: {
    HeaderNotification: 'HeaderNotification'
  }
}))
describe('notificationConnect should work as expected', () => {
  const on = jest.fn((string, func) => func(string))
  const off = jest.fn()
  const stop = jest.fn()

  const spyCreateHubConnect = jest
    .spyOn(api, 'createHubConnect')
    .mockImplementation(() => ({ on, off, stop } as any))
  process.env = Object.assign(process.env, {
    REACT_APP_API_NOTIFICATION: 'https://www.testUrl.com'
  })

  const instance = jest.fn()
  const data = jest.fn()

  const token = 'token'

  afterEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })
  it('Should call /ON/ and /INSTANCE/ functions when all params is correct', async () => {
    jest.useFakeTimers()

    await waitFor(() => {
      notificationConnect(
        {
          idEscola: '56b05354-3029-11ec-8d3d-0242ac130004',
          idUsuario: '56b05354-3029-11ec-8d3d-0242ac130003',
          perfil: 'perfil',
          nivelEnsino: 'nivelEnsino'
        },
        token,
        data,
        instance
      )
      jest.runAllTimers()
    })

    expect(instance).toHaveBeenCalledTimes(1)

    expect(on).toHaveBeenCalledTimes(1)
    expect(spyCreateHubConnect).toHaveBeenCalledWith({
      token,
      url: 'https://www.testurl.com/PositivoOnHub?idEscola=56b05354-3029-11ec-8d3d-0242ac130004&idUsuario=56b05354-3029-11ec-8d3d-0242ac130003&perfil=perfil&nivelEnsino=nivelEnsino'
    })
  })
  it('Should call /noticeError/ function when some param is incorrect', async () => {
    jest.useFakeTimers()
    const noticeError = jest.fn()
    jest.spyOn(newRelic, 'noticeError').mockImplementation(noticeError)

    const instance = jest.fn()
    const data = jest.fn()
    await waitFor(() => {
      notificationConnect(
        {
          idEscola: 'nao-é-um-uuid',
          idUsuario: 'nao-é-um-uuid',
          perfil: 'perfil',
          nivelEnsino: 'nivelEnsino'
        },
        token,
        data,
        instance
      )
      jest.runAllTimers()
    })
    expect(noticeError).toHaveBeenCalledTimes(1)
  })
})

describe('disconnect should work as expected', () => {
  it('Should call of and stop function when there are params', () => {
    const off = jest.fn()
    const stop = jest.fn()
    disconnect({ off, stop } as any)

    expect(off).toHaveBeenCalledWith('HeaderNotification')
    expect(stop).toHaveBeenCalledTimes(1)
  })

  it('nothing should happen when there are not params', () => {
    disconnect(null as any)
    // não há nada para testar no else if
  })
})
