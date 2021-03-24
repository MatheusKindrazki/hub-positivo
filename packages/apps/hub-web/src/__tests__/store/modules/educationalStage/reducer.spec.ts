import EducationalReducer, {
  INITIAL_STATE
} from '~/store/modules/educationalStage/reducer'
import * as educationalStageActions from '~/store/modules/educationalStage/actions'

describe('Reducer of authentication history', () => {
  it('Should set the Educational Stage for the chosen', () => {
    const action = educationalStageActions.setEducationalStage('EF1')

    const state = EducationalReducer(INITIAL_STATE, action)

    expect(state.level).toEqual('EF1')
    expect(state.loading).toEqual(false)
  })

  it('Should set the Educational Stage Default with the array of that the user has access to', () => {
    const mockedPayload = {
      level: 'EF1',
      class: undefined,
      levels: [{ label: 'EF1', value: 'EF1' }]
    }

    const action = educationalStageActions.setEducationalLevels(mockedPayload)

    const state = EducationalReducer(INITIAL_STATE, action)

    expect(state.level).toEqual('EF1')
    expect(state.levels).toContainObject({ label: 'EF1', value: 'EF1' })
  })

  it('Should reset all states', () => {
    const action = educationalStageActions.resetProfileLevels()

    const state = EducationalReducer(undefined, action)

    expect(state.level).toEqual('')
    expect(state.levels).toBeUndefined()
    expect(state.class).toBeUndefined()
  })

  it('Should set Loading as True and Clean User Infos', () => {
    const { Actions } = educationalStageActions

    const state = EducationalReducer(undefined, { type: Actions.SIGN_OUT })
    const state2 = EducationalReducer(undefined, {
      type: Actions.REFRESH_LEVEL_EDUCATION
    })

    expect(state2.loading).toBeTruthy()

    expect(state.level).toEqual('')
    expect(state.levels).toBeUndefined()
    expect(state.class).toBeUndefined()
  })
})
