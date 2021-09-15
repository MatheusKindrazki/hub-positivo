import { useMemo } from 'react'

import { CardProduct } from '~/store/modules/products/types'

import { cardFilter } from '~/utils/cardFilter'
export const useFilterCards = (
  cards: CardProduct[] | undefined,
  search: string
): CardProduct[] => {
  const filterCards = useMemo(
    () => cardFilter({ data: cards || [], search, typeCard: 'solucoes' }),
    [cards, search]
  )
  return filterCards
}
