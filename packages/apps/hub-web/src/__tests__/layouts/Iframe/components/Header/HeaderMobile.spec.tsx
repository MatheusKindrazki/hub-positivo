import React from 'react'

import { debug } from 'node:console'
import { renderHook } from '@testing-library/react-hooks'

import { CardProduct } from '~/store/modules/products/types'

import { cards } from '@hub/test-utils/__mocks__'
import { render, fireEvent } from '@hub/test-utils'
import * as drawer from '@hub/common/components/Drawer'

import * as amplitude from '~/services/amplitude'

import HeaderMobile from '~/layouts/Iframe/components/Header/HeaderMobile'
import cardsMock from '~/../../../test-utils/__mocks__/cards.mock'

describe('getting started', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

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
    const {
      result: { current }
    } = renderHook(() => drawer.useDisclosure())

    jest.spyOn(drawer, 'useDisclosure').mockReturnValue(current)
    const spyOnOpen = jest.spyOn(current, 'onOpen')
    const spyOnClose = jest.spyOn(current, 'onClose')

    const { menuButton } = setup(cardsMock)

    fireEvent.click(menuButton)
    expect(spyOnOpen).toHaveBeenCalled()

    fireEvent.click(menuButton)
    expect(spyOnClose).toHaveBeenCalled()
  })
})
