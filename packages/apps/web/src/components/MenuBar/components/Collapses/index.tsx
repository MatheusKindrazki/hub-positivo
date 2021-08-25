import React from 'react'

import classNames from 'classnames'

import { CardProduct } from '~/store/modules/products/types'

import SimpleCard from '~/components/SimpleCard'

import { CollapseContainer } from './styles'

export interface CollapseProps {
  cards: CardProduct[]
}

const CollapseUI: React.FC<CollapseProps> = ({ cards }) => {
  return (
    <>
      {cards.map((card, i) => (
        <CollapseContainer
          grid={false}
          defaultIsOpen={false}
          key={card.id}
          cor={card.cor}
          id={card.id}
          nome={card.nome}
          className={classNames({
            isLine: i !== 0
          })}
        >
          {card.solucoes.map((s, i) => (
            <SimpleCard key={s.nome + i} title={s.nome} imageSrc={s.arquivo} />
          ))}
        </CollapseContainer>
      ))}
    </>
  )
}

export default CollapseUI
