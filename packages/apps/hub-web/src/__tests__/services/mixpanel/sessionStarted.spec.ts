import mixpanel from 'mixpanel-browser'

import sessionStarted from '~/services/mixpanel/sessionStarted'

jest.mock('mixpanel-browser')

describe('Mixpanel Services', () => {
  it('Should track Session Started on MixPanel', () => {
    const mockedTrack = jest.spyOn(mixpanel, 'track')

    sessionStarted({ tokenRefreshed: false })

    expect(mockedTrack).toBeCalledWith('Session Started', {
      tokenRefreshed: false
    })
  })

  it('Should display an error in the console if MixPanel could not track the event', () => {
    const mockedLog = jest.fn()

    Object.assign(console, {
      error: mockedLog
    })

    jest.spyOn(mixpanel, 'track').mockImplementation(() => {
      throw new Error('Erro')
    })

    sessionStarted({ tokenRefreshed: false })

    expect(mockedLog).toBeCalledWith(
      'Erro ao capturar inicio de sessão no Mixpanel'
    )
  })
})
