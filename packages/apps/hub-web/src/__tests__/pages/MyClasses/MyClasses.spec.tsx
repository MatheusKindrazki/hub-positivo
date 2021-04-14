import React from 'react'

import { render, CustomState, fireEvent, act } from '@psdhub/test-utils'

import MyClasses from '~/pages/MyClasses'

import store from '~/__mocks__/fakeStore.mock'
import fakeClassesResponse from '~/__mocks__/api/fakeClassesResponse.json'

jest.mock('~/pages/MyClasses/components/FakeLoading', () =>
  jest.fn(() => <div>Fake Loading</div>)
)
const classes = fakeClassesResponse.conteudo
  .map(i => {
    return {
      id: i.id,
      ativo: i.ativo,
      alunos: i.alunos,
      nome: i.nome,
      serie: i.serie
    }
  })
  .filter(i => i.ativo)

describe('myClasses should work properly', () => {
  const setup = (CUSTOM_STATE: CustomState<Store.State> = {}) => {
    const wrapper = render(<MyClasses />, {
      store,
      reducers: ['myClasses', 'global'],
      CUSTOM_STATE
    })
    return { ...wrapper }
  }
  it('Should render /Nenhuma classe encontrada!/ when classes are not provided', () => {
    const { queryByText } = setup()
    const noClassFound = queryByText(/Nenhuma turma encontrada!/i)
    const classesTitle = queryByText(/Minhas Turmas/i)

    expect(noClassFound).not.toBeNull()
    expect(classesTitle).not.toBeNull()
  })

  it('Should render FakeLoading when loading is true', () => {
    const { queryAllByText } = setup({ myClasses: { loading: true } })
    const loading = queryAllByText(/Fake Loading/i)

    expect(loading).not.toBeNull()
    expect(loading.length).toBe(12)
  })

  it('Should render when classes are provided', () => {
    const { queryByText } = setup({
      myClasses: { classes }
    })

    const class6Ano = classes[0]
    const class7Ano = classes[1]

    let className = queryByText(`${class6Ano.nome} - ${class6Ano.serie.nome}`)
    expect(className).not.toBeNull()

    className = queryByText(`${class7Ano.nome} - ${class7Ano.serie.nome}`)
    expect(className).not.toBeNull()
  })

  it('Should filter classes when input search is trigged', async () => {
    jest.useFakeTimers()
    const { getByPlaceholderText, findByText } = setup({
      myClasses: { classes }
    })

    const input = getByPlaceholderText(/Buscar Alunos/i)
    fireEvent.change(input, { target: { value: 'Valor inexistente' } })

    act(() => {
      jest.runAllTimers()
    })

    expect(await findByText(/Nenhuma turma encontrada/i)).toBeInTheDocument()
  })
})
