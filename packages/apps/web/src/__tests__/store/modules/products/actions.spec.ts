import {
  productRequest,
  productSuccess,
  productIntegration,
  productFailure
  // setFrameURL
} from '~/store/modules/products/actions'

const mockedTypes = {
  PRODUCT_REQUEST: '@products/PRODUCT_REQUEST',
  PRODUCT_SUCCESS: '@products/PRODUCT_SUCCESS',
  PRODUCT_FAILURE: '@products/PRODUCT_FAILURE',
  WITHOUT_ACCESS: '@auth/WITHOUT_ACCESS',
  PRODUCT_INTEGRATION: '@products/PRODUCT_INTEGRATION',
  SIGN_OUT: '@auth/SIGN_OUT',
  FRAME_URL: '@products/FRAME_URL',
  REHYDRATE: 'persist/REHYDRATE'
}

describe('products action creators should work properly', () => {
  it('should create an request action with productRequest', () => {
    const payload = { search: 'Provas' }
    const expectedAction = {
      type: mockedTypes.PRODUCT_REQUEST,
      payload
    }
    expect(productRequest(payload)).toEqual(expectedAction)
  })

  it('should create an success action with productSuccess', () => {
    const payload = {
      frameUrl: 'http://produto/teste.com',
      frameName: 'Produto'
    }
    const expectedAction = {
      type: mockedTypes.PRODUCT_SUCCESS,
      payload
    }
    expect(productSuccess(payload)).toEqual(expectedAction)
  })

  it('should create a productIntegration action on productIntegration', () => {
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

    const expectedAction = {
      type: mockedTypes.PRODUCT_INTEGRATION,
      payload
    }
    expect(productIntegration(payload)).toEqual(expectedAction)
  })

  it('should create an failure action on productFailure', () => {
    const expectedAction = { type: mockedTypes.PRODUCT_FAILURE }
    expect(productFailure()).toEqual(expectedAction)
  })
})
