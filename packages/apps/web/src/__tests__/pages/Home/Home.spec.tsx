import React from 'react'

import { openTour } from '~/store/modules/tour/actions'
import { store } from '~/store'

import { cards as mockedCards } from '@psdhub/test-utils/__mocks__'
import {
  render,
  fireEvent,
  act,
  CustomState,
  waitFor
} from '@psdhub/test-utils'
import createSlug from '@psdhub/common/utils/createSlug'

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
  },
  tour: {
    steps: [{ selector: 'test', content: 'test' }]
  }
}

jest.mock('~/services/mixpanel/toolOpened')

describe('Testing that the Home page works correctly', () => {
  const { user, profile, products, educationalStage, tour } = mockState
  const defaultItemsInState: CustomState<Store.State> = {
    user,
    profile,
    products,
    educationalStage,
    tour
  }
  const setup = (contextConfig: CustomState<Store.State> = {}) => {
    const utils = render(<Home />, {
      store,
      reducers: [
        'user',
        'profile',
        'educationalStage',
        'products',
        'global',
        'tour'
      ],
      CUSTOM_STATE: { ...defaultItemsInState, ...contextConfig }
    })
    return { ...utils }
  }

  const queryConfig = {
    exact: false
  }

  it('Should render the correct elements on the screen', () => {
    const { queryByText, queryAllByText } = setup()
    const { data } = products

    const soonBagde = queryAllByText('Em breve', queryConfig)

    expect(soonBagde.length).toBe(2)
    // Busca cada grupo de soluções e verifica se todos os cards estão na tela
    data.forEach(({ nome, solucoes }) => {
      const groupOfSolutionTitle = queryByText(nome)
      expect(groupOfSolutionTitle).not.toBeNull()

      solucoes.forEach(({ nome: solutionName, descricao }) => {
        const cardName = queryByText(solutionName)
        const cardDescription = queryByText(descricao)

        expect(cardName).not.toBeNull()
        expect(cardDescription).not.toBeNull()
      })
    })
  })

  it('Should not show any card when an unknown card is searched on filter', async () => {
    jest.useFakeTimers()
    const { getAllByTestId, queryAllByTestId, getByTestId } = setup()

    expect(getByTestId('search-input')).toBeInTheDocument()

    const searchInput = getByTestId('search-input')

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
    expect(emptyMessage).not.toBeNull()
  })

  it('Should render with default Welcome titles', async () => {
    const emptyContextValues: CustomState<Store.State> = {
      user: { info: { name: undefined } },
      profile: {
        name: 'Administrador'
      },
      educationalStage: {}
    }

    const { queryByText } = setup(emptyContextValues)

    const defaultRole = queryByText('Olá', queryConfig)

    expect(defaultRole).not.toBeNull()
  })

  it('Tour button should work ', async () => {
    const { getByText, storeUtils } = setup()

    expect(getByText('FAZER TOUR', queryConfig)).toBeInTheDocument()

    await waitFor(() => fireEvent.click(getByText('FAZER TOUR', queryConfig)))

    expect(storeUtils?.getActions()).toContainEqual(openTour(true))
  })
})
