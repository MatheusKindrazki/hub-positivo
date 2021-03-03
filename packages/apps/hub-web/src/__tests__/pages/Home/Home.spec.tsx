import React from 'react'

import { store } from '~/store'

import {
  render,
  fireEvent,
  act,
  CustomRenderOptions,
  CustomState
} from '@hub/test-utils'
import createSlug from '@hub/common/utils/createSlug'

import Home from '~/pages/Home'

const user = {
  user: {
    name: 'Firstname Lastname'
  },
  school: {
    label: 'Escola Positivo ON SPE 18-005'
  }
}

const profile = {
  name: 'Administrador'
}

const products = {
  loading: false,
  data: [
    {
      ordem: 1,
      ativo: true,
      cor: 'blue',
      nome: 'Avaliação',
      solucoes: [
        {
          ativo: true,
          nome: 'Provas',
          descricao: 'Crie e aplique suas provas',
          link: 'psd.provas.com'
        },
        {
          ativo: true,
          nome: 'Redação',
          descricao: 'Inclua redações em suas avaliações'
        }
      ]
    },
    {
      ordem: 2,
      ativo: true,
      cor: 'blue',
      nome: 'Recursos',
      solucoes: [
        {
          ativo: true,
          nome: 'Salas virtuais',
          descricao: 'Visualize e acesse suas aulas virtuais',
          link: 'psd.provas.com'
        },
        {
          ativo: true,
          nome: 'Playground',
          descricao: 'Jogos e objetos educacionais'
        }
      ]
    }
  ]
}

describe('Testing that the Home page works correctly', () => {
  const defaultItemsInState: CustomState = {
    user,
    profile,
    products
  }
  const setup = (contextConfig: CustomState = {}) => {
    const utils = render(<Home />, {
      store,
      reducers: ['user', 'profile', 'educationalStage', 'products', 'global'],
      CUSTOM_STATE: { ...defaultItemsInState, ...contextConfig }
    })
    const { getByTestId } = utils
    const searchInput = getByTestId('search-input')

    return { searchInput, ...utils }
  }

  // beforeEach(() => jest.useFakeTimers())

  const queryConfig = {
    exact: false
  }

  it('Should render the correct elements on the screen', () => {
    const { getByText, getAllByText, searchInput } = setup()

    const { name } = user.user
    const { label } = user.school
    const { data } = products

    const fragmentedName = name.split(' ')

    const nameInitals = getByText(fragmentedName[0][0] + fragmentedName[1][0])
    const nameElement = getByText(fragmentedName[0], queryConfig)
    const schoolName = getByText(label, queryConfig)
    const soonBagde = getAllByText('Em breve', queryConfig)

    expect(soonBagde.length).toBe(2)
    expect(nameInitals).toBeInTheDocument()
    expect(nameElement).toBeInTheDocument()
    expect(schoolName).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()

    // Busca cada grupo de soluções e verifica se todos os cards estão na tela
    data.forEach(({ nome, solucoes }) => {
      const groupOfSolutionTitle = getByText(nome)
      expect(groupOfSolutionTitle).toBeInTheDocument()

      solucoes.forEach(({ nome: solutionName, descricao }) => {
        const cardName = getByText(solutionName)
        const cardDescription = getByText(descricao)

        expect(cardName).toBeInTheDocument()
        expect(cardDescription).toBeInTheDocument()
      })
    })
  })

  it('Should not show any card when an unknown card is searched on filter', async () => {
    jest.useFakeTimers()
    const { queryByText, searchInput, getAllByTestId } = setup()
    const { data } = products

    let value = 'card inexistente'

    act(() => {
      fireEvent.change(searchInput, { target: { value } })
      jest.runAllTimers()
    })

    // verifica se após o filtro não há nenhum card em tela
    data.forEach(({ nome, solucoes }) => {
      const groupOfSolutionTitle = queryByText(nome)
      expect(groupOfSolutionTitle).toBeNull()

      solucoes.forEach(({ nome: solutionName, descricao }) => {
        const cardName = queryByText(solutionName)
        const cardDescription = queryByText(descricao)

        expect(cardName).toBeNull()
        expect(cardDescription).toBeNull()
      })
    })

    value = 'Provas'
    act(() => {
      fireEvent.change(searchInput, { target: { value } })
      jest.runAllTimers()
    })

    const cards = getAllByTestId('card-container')

    expect(cards.length).toBe(1)
  })

  it('Should dispatch `@auth/AUTH_PRODUCT_REQUEST` when a card is clicked', async () => {
    const { getByText, storeUtils } = setup()

    const card = getByText('Provas')
    fireEvent.click(card)
    const action = storeUtils?.getActions()[0]
    const { type, payload } = action
    const { data } = products
    const provasSolution = data[0].solucoes[0]

    expect(type).toBe('@auth/AUTH_PRODUCT_REQUEST')
    expect(payload).toStrictEqual({
      name: provasSolution.nome,
      product: createSlug('provas'),
      tipoRenderizacao: undefined,
      url: provasSolution.link
    })
  })

  it('Should not render any card when product`s loading  is true', async () => {
    const { queryAllByTestId } = setup({
      products: { data: [], loading: true }
    })
    const cards = queryAllByTestId('card-container')
    expect(cards.length).toBe(0)
  })

  it('Should render a message when the products have already loaded, but they are empty []', async () => {
    const { queryByText } = setup({
      products: { data: [], loading: false }
    })
    const emptyMessage = queryByText('Nenhum produto encontrado!', queryConfig)
    expect(emptyMessage).toBeInTheDocument()
  })
})
