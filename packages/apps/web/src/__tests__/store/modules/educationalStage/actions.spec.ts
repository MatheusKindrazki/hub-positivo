import * as educationalStageActions from '~/store/modules/educationalStage/actions'

describe('Action of educationalStage history', () => {
  it.skip('Should the setEducationalStage calls the correct action and receive the value within payload', () => {
    const spy = jest.spyOn(educationalStageActions, 'setEducationalStage')

    const mockedType = {
      type: '@education/SET_LEVEL'
    }

    const resolved = educationalStageActions.setEducationalStage('EF1')

    expect(spy).toBeCalledWith('EF1')

    expect(resolved).toEqual({ ...mockedType, payload: 'EF1' })
  })

  it.skip('Should the setEducationalStage calls the correct action and receive the value within payload', () => {
    const mockedType = {
      type: '@education/RESET_LEVEL'
    }

    const resolved = educationalStageActions.resetProfileLevels()

    expect(resolved).toEqual({ ...mockedType })
  })

  it.skip('Should the setEducationalStage calls the correct action and receive the value within payload', () => {
    const spy = jest.spyOn(educationalStageActions, 'setEducationalLevels')

    const mockedPayload = {
      level: 'EF1',
      class: undefined,
      levels: [{ label: 'EF1', value: 'EF1', series: ['1ª série', '2ª série'] }]
    }

    const mockedType = {
      type: '@education/GET_LEVEL_SUCCESS'
    }

    const resolved = educationalStageActions.setEducationalLevels(mockedPayload)

    expect(spy).toBeCalledWith(mockedPayload)

    expect(resolved).toEqual({ ...mockedType, payload: mockedPayload })
  })
})
