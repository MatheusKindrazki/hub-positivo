import React from 'react'

import { store } from '~/store'

import { cards as mockedCards } from '@hub/test-utils/__mocks__'
import { render, fireEvent, act, CustomState } from '@hub/test-utils'
import createSlug from '@hub/common/utils/createSlug'

import Home from '~/pages/Home'

const mockState = {
  user: {
    info: {
      name: 'Firstname Lastname',
      school: {
        label: 'Escola Positivo ON SPE 18-005'
      }
    }
  },
  profile: {
    name: 'Administrador'
  },
  products: {
    loading: false,
    data: mockedCards
  },
  educationalStage: {
    class: 'Class Name',
    level: 'Level Educational Stage'
  }
}

jest.mock('~/services/mixpanel/toolOpened')

describe('Testing that the Home page works correctly', () => {
  const { user, profile, products, educationalStage } = mockState
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

  const queryConfig = {
    exact: false
  }

  it('Should render the correct elements on the screen', () => {
    const { getByText, getAllByText } = setup()

    const { name } = user.info
    const { data } = products

    const fragmentedName = name.split(' ')

    const nameInitals = getByText(fragmentedName[0][0] + fragmentedName[1][0])
    const soonBagde = getAllByText('Em breve', queryConfig)

    expect(soonBagde.length).toBe(2)
    expect(nameInitals).toBeInTheDocument()

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
    const { searchInput, getAllByTestId, queryAllByTestId } = setup()

    let value = 'card inexistente'
    let cards: HTMLElement[]

    act(() => {
      fireEvent.change(searchInput, { target: { value } })
      jest.runAllTimers()
    })

    cards = queryAllByTestId('card-container')
    expect(cards.length).toBe(0)

    value = 'Provas'
    act(() => {
      fireEvent.change(searchInput, { target: { value } })
      jest.runAllTimers()
    })

    cards = getAllByTestId('card-container')

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
      tipoRenderizacao: provasSolution.tipoRenderizacao,
      url: provasSolution.link
    })
  })

  it('Should not render any cards when the products are loading', async () => {
    const { queryAllByTestId } = setup({
      products: { data: [], loading: true }
    })
    const cards = queryAllByTestId('card-container')
    expect(cards.length).toBe(0)
  })

  it('Should render a message when the products have already loaded, but they are empty []', async () => {
    const { queryByText } = setup({
      products: { data: undefined, loading: false }
    })
    const emptyMessage = queryByText('Nenhum produto encontrado!', queryConfig)
    expect(emptyMessage).toBeInTheDocument()
  })

  it('Should render with default Welcome titles', async () => {
    const emptyContextValues: CustomState = {
      user: {},
      profile: {
        name: undefined
      },
      educationalStage: {}
    }
    const { queryByText } = setup(emptyContextValues)

    const defaultRole = queryByText('Perfil', queryConfig)
    const defaultUser = queryByText('Usuário', queryConfig)
    expect(defaultRole).toBeInTheDocument()
    expect(defaultUser).toBeInTheDocument()
  })

  it('Should render `userClass` and `Profile` when profile name is `Aluno`', async () => {
    const student = 'Aluno'
    const className = educationalStage.class

    const studentProfile: CustomState = {
      profile: {
        name: student
      },
      educationalStage
    }
    const { queryByText } = setup(studentProfile)

    const studentTitle = queryByText(student, queryConfig)
    const userClass = queryByText(className, queryConfig)

    expect(studentTitle).toBeInTheDocument()
    expect(userClass).toBeInTheDocument()
  })
})
