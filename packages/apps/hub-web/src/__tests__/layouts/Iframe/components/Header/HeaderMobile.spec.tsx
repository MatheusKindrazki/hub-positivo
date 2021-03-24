import React from 'react'

import { renderHook } from '@testing-library/react-hooks'

import { CardProduct } from '~/store/modules/products/types'

import { cards } from '@hub/test-utils/__mocks__'
import { render, fireEvent, act } from '@hub/test-utils'
import * as drawer from '@hub/common/components/Drawer'

import * as amplitude from '~/services/amplitude'

import HeaderMobile from '~/layouts/Iframe/components/Header/HeaderMobile'
import cardsMock from '~/../../../test-utils/__mocks__/cards.mock'

describe('Mobile Header`s layout should work properly', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
    jest.resetAllMocks()
  })

  const renderUseDisclosure = () => {
    const {
      result: { current }
    } = renderHook(() => drawer.useDisclosure())
    return { ...current }
  }

  const setup = (cards: CardProduct[] | undefined) => {
    const handlePush = jest.fn()
    const wrapper = render(
      <HeaderMobile cards={cards} handlePush={handlePush} />
    )

    const menuButton = wrapper.getByRole('button')

    return { ...wrapper, handlePush, menuButton }
  }

  it('Should render correct infos on screen when menu is open', () => {
    const { getByText, menuButton } = setup(cardsMock)

    fireEvent.click(menuButton)

    cards.forEach(({ nome: tituloDasSolucoes, solucoes }: CardProduct) => {
      const solutionsTitle = getByText(tituloDasSolucoes)
      expect(solutionsTitle).toBeInTheDocument()

      solucoes.forEach(({ nome }) => {
        const name = getByText(nome)

        expect(name).toBeInTheDocument()
      })
    })
  })

  it('Should call handlePush function when a card is clicked', () => {
    const spyAmplitudeToolOpened = jest
      .spyOn(amplitude, 'amplitudeToolOpened')
      .mockImplementation(() => jest.fn())
    const { getByText, menuButton, handlePush } = setup(cardsMock)

    fireEvent.click(menuButton)

    const firstCard = cardsMock[0].solucoes[0]
    const soluction = getByText(firstCard.nome)

    fireEvent.click(soluction)
    expect(handlePush).toHaveBeenCalledWith({
      nome: firstCard.nome,
      tipoRenderizacao: firstCard.tipoRenderizacao,
      url: firstCard.link
    })

    expect(spyAmplitudeToolOpened).toHaveBeenCalledWith({
      card_name: firstCard.nome,
      location: 'header'
    })
  })

  it('Should call useDisclosure`s functions handlers when Drawer is triggered', () => {
    const current = renderUseDisclosure()

    jest.spyOn(drawer, 'useDisclosure').mockReturnValue(current)

    const spyOnOpen = jest.spyOn(current, 'onOpen')
    const spyOnClose = jest.spyOn(current, 'onClose')
    const { menuButton } = setup(cardsMock)

    fireEvent.click(menuButton)
    expect(spyOnOpen).toHaveBeenCalledTimes(1)

    fireEvent.click(menuButton)
    expect(spyOnClose).toHaveBeenCalledTimes(1)
  })

  it('Should render without crashing even when cards were not provided', () => {
    const { menuButton, queryByPlaceholderText } = setup(undefined)
    fireEvent.click(menuButton)

    const input = queryByPlaceholderText('Buscar soluções', { exact: false })
    expect(input).toBeInTheDocument()
  })

  it('Should filter the cards correctly', async () => {
    jest.useFakeTimers()

    const { menuButton, getByPlaceholderText, getByText, queryByText } = setup(
      cardsMock
    )
    fireEvent.click(menuButton)

    const input = getByPlaceholderText('Buscar soluções', { exact: false })
    const searchValue = 'Playground'

    fireEvent.change(input, { target: { value: searchValue } })

    act(() => {
      jest.runAllTimers()
    })

    // verificar se os elementos que não dão match com a pesquisa não estão na tela
    // verificar se o elemento que da match com a pesquisa está na tela
    cards.forEach(({ solucoes }: CardProduct) => {
      solucoes.forEach(({ nome }) => {
        const name = queryByText(nome)

        if (nome === searchValue) {
          expect(name).toBeInTheDocument()
        } else {
          expect(name).toBeNull()
        }
      })
    })
  })

  it.skip('Should close Drawer when `Escape` (Esc) key is down', async () => {
    const onClose = jest.fn()
    const current = renderUseDisclosure()

    jest
      .spyOn(drawer, 'useDisclosure')
      .mockReturnValue({ ...current, isOpen: true, onClose })

    const { getByPlaceholderText } = setup(cardsMock)
    const input = getByPlaceholderText('Buscar soluções', { exact: false })

    // focando no search input para ter referência de escape
    fireEvent.click(input)

    // clicando em `Esc` para fechar o Drawer
    fireEvent.keyDown(input, { key: 'Esc', code: 27 })
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
