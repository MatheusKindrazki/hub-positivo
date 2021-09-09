import products, { INITIAL_STATE } from '~/store/modules/products/reducer'
import {
  productRequest,
  productSuccess,
  productIntegration,
  productFailure
} from '~/store/modules/products/actions'
import { signOut, withoutAccess } from '~/store/modules/auth/actions'

jest.mock('~/services/mixpanel/clearAll')

describe('authProduct reducer', () => {
  it('returns the initial state when an action type is not passed', () => {
    const result = products(undefined, { type: null })
    expect(result).toEqual(INITIAL_STATE)
  })

  it('should change loading to true when a product is requested', () => {
    const payload = { search: 'Provas' }
    expect(products(INITIAL_STATE, productRequest(payload))).toEqual({
      loading: true,
      data: []
    })
  })

  it('loading is set to false on success action', () => {
    const payload = {
      frameUrl: 'http://produto/teste.com',
      frameName: 'Produto'
    }
    const result = products(INITIAL_STATE, productSuccess(payload))
    expect(result).toEqual({ loading: false })
  })

  it('should set data on product integration action', () => {
    const payload = [
      {
        id: '',
        ativo: true,
        nome: '',
        cor: '',
        solucoes: [
          {
            id: '',
            nome: '',
            descricao: '',
            arquivo: '',
            tipoRenderizacao: '',
            ativo: true
          }
        ]
      }
    ]
    const result = products(INITIAL_STATE, productIntegration(payload))
    expect(result).toEqual({ loading: true, data: payload })
  })

  it('should set loading to false and reset data on product failure action', () => {
    expect(products(INITIAL_STATE, productFailure())).toEqual({
      loading: false,
      data: []
    })
  })

  it('should set loading to true and reset data on without access action', () => {
    expect(products(INITIAL_STATE, withoutAccess())).toEqual({
      loading: true,
      data: []
    })
  })

  it('should set loading to true and reset data on sign out action', () => {
    expect(products(INITIAL_STATE, signOut())).toEqual({
      loading: true,
      data: []
    })
  })
})
