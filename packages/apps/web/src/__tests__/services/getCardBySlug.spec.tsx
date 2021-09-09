import { store } from '~/store'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import { getCardBySlug } from '~/services/getCardBySlug'

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
    test: true
  }
}

const mockedGetParameters = {
  nivelEnsino: 'test-educational-level',
  perfil: 'test-profile',
  slug: 'test-slug'
}
const mockedHeaders = { headers: { Authorization: 'Bearer test-token' } }

describe('getCardBySlug should work as expected', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  jest
    .spyOn(store, 'getState')
    .mockReturnValue({ auth: { token: 'test-token' } } as any)

  it('getCardBySlug should work as expected', async () => {
    // mock da resposta da api
    const getSpy = jest
      .spyOn(api, 'get')
      .mockResolvedValue(mockedApiResponse as any)

    const result = await getCardBySlug(mockedProps)

    expect(getSpy).toHaveBeenCalledWith(
      'Solucao/SolucaoPorSlug',
      mockedGetParameters,
      mockedHeaders
    )
    expect(result).toBe(mockedApiResponse.data)
  })

  it('getCardBySlug should throw a toast error when api returns with ok false', async () => {
    const toastSpy = jest.spyOn(toast, 'error')
    // mock da resposta da api com ok: false
    const getSpy = jest
      .spyOn(api, 'get')
      .mockResolvedValue(mockedApiErrorResponse as any)

    await getCardBySlug(mockedProps)

    expect(getSpy).toHaveBeenCalledWith(
      'Solucao/SolucaoPorSlug',
      mockedGetParameters,
      mockedHeaders
    )
    expect(toastSpy).toHaveBeenCalledWith(
      'Sinto muito, você não tem acesso a esta solução.'
    )
  })

  it('getCardBySlug should early return when no slug is received', async () => {
    // mudanca do mock das propriedades para que nao haja slug
    mockedProps.slug = undefined as any

    // spyOn do get para verificacao da chamada
    const getSpy = jest.spyOn(api, 'get')

    const result = await getCardBySlug(mockedProps)

    expect(getSpy).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })
})
