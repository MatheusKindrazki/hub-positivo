import school, { INITIAL_STATE } from '~/store/modules/school/reducer'
import {
  schoolGetAllRequest,
  schoolGetAllSuccess,
  schoolGetAllFailure
} from '~/store/modules/school/actions'

describe('school reducer', () => {
  it('returns the initial state when an action type is not passed', () => {
    const result = school(undefined, { type: null })
    expect(result).toEqual(INITIAL_STATE)
  })

  it('should change loading to true and reset data when schools are requested', () => {
    expect(school(INITIAL_STATE, schoolGetAllRequest())).toEqual({
      loading: true,
      schools: []
    })
  })

  it('loading is set to false and data reseted on failure action', () => {
    const result = school(INITIAL_STATE, schoolGetAllFailure())
    expect(result).toEqual({ loading: false, schools: [] })
  })

  it('loading is set to false on success action', () => {
    const payload = [
      {
        id: 'fake-id',
        nome: 'test-school',
        ativo: true
      }
    ]
    const result = school(INITIAL_STATE, schoolGetAllSuccess(payload))
    expect(result).toEqual({ loading: false, schools: payload })
  })
})
