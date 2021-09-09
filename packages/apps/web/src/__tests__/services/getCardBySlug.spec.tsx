import { store } from '~/store'

import { toast } from '@psdhub/common/utils'
import * as api from '@psdhub/api'

import { getCardBySlug } from '~/services/getCardBySlug'

jest.mock('@psdhub/api', () => {
  const rest = jest.requireActual('@psdhub/api')
  return {
    ...rest,
    getInstance: jest.fn()
  }
})

const mockedProps = {
  slug: 'test-slug',
  perfil: 'test-profile',
  nivelEnsino: 'test-educational-level'
}

const mockedApiResponse = {
  ok: true,
  data: {
    test: true
  }
}

const mockedApiErrorResponse = {
  ok: false,
  data: {
    test: true,
    mensagem: 'Sinto muito, você não tem acesso a esta solução.'
  }
}

const mockedGetParameters = {
  nivelEnsino: 'test-educational-level',
  perfil: 'test-profile',
  slug: 'test-slug'
}
const mockedHeaders = { headers: { Authorization: 'Bearer reduced-token' } }

describe('getCardBySlug should work as expected', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  jest.spyOn(store, 'getState').mockReturnValue({
    auth: { reduced_token: 'reduced-token' }
  } as any)

  it('getCardBySlug should work as expected', async () => {
    // mock da resposta da api

    const spyGetInstance = jest.spyOn(api, 'getInstance').mockReturnValue({
      get: jest.fn(() => mockedApiResponse),
      setHeaders: jest.fn()
    } as any)

    const spyGet = jest.spyOn(api.getInstance('default'), 'get')
    const spySetHeaders = jest.spyOn(api.getInstance('default'), 'setHeaders')
    const result = await getCardBySlug(mockedProps)
    expect(spyGetInstance).toHaveBeenCalledWith('default')
    expect(spySetHeaders).toHaveBeenCalledWith({
      Authorization: 'Bearer reduced-token'
    })
    expect(spyGet).toHaveBeenCalledWith(
      'Solucao/SolucaoPorSlug',
      mockedGetParameters,
      mockedHeaders
    )
    expect(result).toBe(mockedApiResponse.data)
  })

  it('getCardBySlug should throw a toast error when api returns with ok false', async () => {
    const toastSpy = jest.spyOn(toast, 'error')

    jest.spyOn(api, 'getInstance').mockReturnValue({
      get: jest.fn(() => mockedApiResponse),
      setHeaders: jest.fn()
    } as any)
    // mock da resposta da api com ok: false
    const spyGet = jest
      .spyOn(api.getInstance('default'), 'get')
      .mockImplementation(() => mockedApiErrorResponse as any)

    jest
      .spyOn(api.getInstance('default'), 'setHeaders')
      .mockImplementation(jest.fn())

    await getCardBySlug(mockedProps)

    expect(spyGet).toHaveBeenCalledWith(
      'Solucao/SolucaoPorSlug',
      mockedGetParameters,
      mockedHeaders
    )
    expect(toastSpy).toHaveBeenCalledWith(mockedApiErrorResponse.data.mensagem)
  })

  it('getCardBySlug should early return when no slug is received', async () => {
    // mudanca do mock das propriedades para que nao haja slug
    mockedProps.slug = undefined as any

    // spyOn do get para verificacao da chamada
    const getSpy = jest.spyOn(api, 'getInstance').mockImplementation(
      () =>
        ({
          get: jest.fn()
        } as any)
    )

    const result = await getCardBySlug(mockedProps)

    expect(getSpy).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })
})
