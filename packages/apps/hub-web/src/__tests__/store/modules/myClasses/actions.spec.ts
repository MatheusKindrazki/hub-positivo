import * as myClassesActions from '~/store/modules/myClasses/actions'

describe('Action of global history', () => {
  it('Should call the classesRequest action correctly and receive the value within payload', () => {
    const spy = jest.spyOn(myClassesActions, 'classesRequest')

    const mockedType = {
      type: '@classes/GET_REQUEST'
    }

    const resolved = myClassesActions.classesRequest()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })

  it('Should call the classesSuccess action correctly and receive the value within payload', () => {
    const spy = jest.spyOn(myClassesActions, 'classesSuccess')

    const mockedType = {
      type: '@classes/GET_SUCCESS'
    }

    const mock = {
      ativo: true,
      id: 123,
      nome: 'Turma PSD 1',
      serie: { nome: '5 serie' },
      alunos: [
        { nome: 'Matheus Kindrazki', ativo: true, idUsuarioUnico: '123' }
      ]
    }

    const resolved = myClassesActions.classesSuccess([mock])

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType, payload: [mock] })
  })

  it('Should call the classesFailure action correctly and receive the value within payload', () => {
    const spy = jest.spyOn(myClassesActions, 'classesFailure')

    const mockedType = {
      type: '@classes/GET_FAILURE'
    }

    const resolved = myClassesActions.classesFailure()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })
})
