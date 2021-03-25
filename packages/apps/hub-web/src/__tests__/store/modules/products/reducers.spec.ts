import products from '~/store/modules/products/reducer'
import { INITIAL_STATE as initialState } from '~/store/modules/products/reducer'
import {
  productRequest,
  productSuccess,
  productIntegration,
  productFailure,
  setFrameURL
} from '~/store/modules/products/actions'
import { signOut, withoutAccess } from '~/store/modules/auth/actions'

describe('authProduct reducer', () => {
  it('returns the initial state when an action type is not passed', () => {
    const result = products(undefined, { type: null })
    expect(result).toEqual(initialState)
  })

  it('should change loading to true when a product is requested', () => {
    const payload = { search: 'Provas' }
    expect(products(initialState, productRequest(payload))).toEqual({
      loading: true,
      data: []
    })
  })

  it('loading is set to false on success action', () => {
    const payload = {
      frameUrl: 'http://produto/teste.com',
      frameName: 'Produto'
    }
    const result = products(initialState, productSuccess(payload))
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
    const result = products(initialState, productIntegration(payload))
    expect(result).toEqual({ loading: true, data: payload })
  })

  it('should set loading to false and reset data on product failure action', () => {
    expect(products(initialState, productFailure())).toEqual({
      loading: false,
      data: []
    })
  })

  it('should set loading to true and reset data on without access action', () => {
    expect(products(initialState, withoutAccess())).toEqual({
      loading: true,
      data: []
    })
  })

  it('should set frameURL and frame name on frame URL action', () => {
    const payload = {
      url: 'http://produto/teste.com',
      name: 'Produto'
    }
    expect(products(initialState, setFrameURL(payload))).toEqual({
      frameName: 'Produto',
      frameUrl: 'http://produto/teste.com',
      loading: true,
      data: []
    })
  })

  it('should set loading to true and reset data on sign out action', () => {
    expect(products(initialState, signOut())).toEqual({
      loading: true,
      data: []
    })
  })
})
