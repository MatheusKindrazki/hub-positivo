import * as integrationActions from '~/store/modules/productIntegrations/actions'

describe('Action of global history', () => {
  it('Should call the loading action correctly and receive the value within payload', () => {
    const spy = jest.spyOn(integrationActions, 'mhundArvoreIntegration')

    const mockedType = {
      type: '@integration/SAE_ARVORE_INTEGRATION'
    }

    const resolved = integrationActions.mhundArvoreIntegration()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })
})
