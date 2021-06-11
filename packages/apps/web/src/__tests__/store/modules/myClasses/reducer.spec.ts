import ClassesReducer, {
  INITIAL_STATE
} from '~/store/modules/myClasses/reducer'
import * as classesActions from '~/store/modules/myClasses/actions'

describe('Reducer of authentication history', () => {
  it('Should set Loading to True When Request Action is Triggered', () => {
    const action = classesActions.classesRequest()

    const state = ClassesReducer(INITIAL_STATE, action)

    expect(state.loading).toEqual(true)
  })

  it('Should set Loading to false and classes to return api When Success Action is Triggered', () => {
    const mock = {
      ativo: true,
      id: 123,
      nome: 'Turma PSD 1',
      serie: { nome: '5 serie' },
      alunos: [
        { nome: 'Matheus Kindrazki', ativo: true, idUsuarioUnico: '123' }
      ]
    }

    const action = classesActions.classesSuccess([mock])

    const state = ClassesReducer(INITIAL_STATE, action)

    expect(state.classes).toEqual([mock])
  })

  it('Should set Loading to false and classes to undefined When Failure Action is Triggered', () => {
    const action = classesActions.classesFailure()

    const state = ClassesReducer(undefined, action)

    expect(state.loading).toEqual(false)
    expect(state.classes).toBeUndefined()
  })

  it('Should return the unchanged state if it does not contain any action', () => {
    const state = ClassesReducer(undefined, { type: 'non-valid-type' })

    expect(state).toEqual(INITIAL_STATE)
  })
})
