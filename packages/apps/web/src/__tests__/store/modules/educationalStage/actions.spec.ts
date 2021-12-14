import * as educationalStageActions from '~/store/modules/educationalStage/actions'

describe('Action of educationalStage history', () => {
  it('Should the setEducationalStage calls the correct action and receive the value within payload', () => {
    const spy = jest.spyOn(educationalStageActions, 'setEducationalStage')

    const mockedType = {
      type: '@education/SET_LEVEL'
    }

    const resolved = educationalStageActions.setEducationalStage('EF1')

    expect(spy).toBeCalledWith('EF1')

    expect(resolved).toEqual({ ...mockedType, payload: 'EF1' })
  })

  it('Should the setEducationalStage calls the correct action and receive the value within payload', () => {
    const mockedType = {
      type: '@education/RESET_LEVEL'
    }

    const resolved = educationalStageActions.resetProfileLevels()

    expect(resolved).toEqual({ ...mockedType })
  })

  it('Should the setEducationalStage calls the correct action and receive the value within payload', () => {
    const spy = jest.spyOn(educationalStageActions, 'setEducationalLevels')

    const mockedPayload = {
      level: 'EF1',
      class: '1ª série',
      levels: [
        {
          label: 'Ensino Fundamental Anos Iniciais',
          value: 'EF1',
          series: [
            {
              class: '1ª série',
              name: '1ª série - A',
              valid: true
            }
          ]
        }
      ]
    }

    const mockedType = {
      type: '@education/GET_LEVEL_SUCCESS'
    }

    const resolved = educationalStageActions.setEducationalLevels(mockedPayload)

    expect(spy).toBeCalledWith(mockedPayload)

    expect(resolved).toEqual({ ...mockedType, payload: mockedPayload })
  })
})
