import {
  CardProduct,
  Product as Solucoes
} from '~/store/modules/products/types'
import { ClassesAPI, Alunos } from '~/store/modules/myClasses/types'

type CardProductWithoutId = Omit<ClassesAPI, 'id'>
type ClassesAPIWithoutId = Omit<CardProduct, 'id'>
interface CardGroup extends CardProductWithoutId, ClassesAPIWithoutId {
  id: string | number
}

export type KeyProps<T extends { [key: string]: any }> = {
  [P in keyof T]: any
}

function cardFilter<T extends Partial<CardGroup>>(attributes: {
  data: T[]
  search: string | null
  typeCard: 'solucoes' | 'alunos'
}): T[] {
  const { data, search, typeCard } = attributes

  if (!search) return data

  const newcards = [] as T[]
  data.forEach((i: T) => {
    i[typeCard]?.forEach((card: Solucoes | Alunos) => {
      if (card.nome.toLowerCase().includes(search.toLowerCase())) {
        if (!newcards.length) {
          newcards.push({
            ...i,
            [typeCard]: [card]
          })
        } else {
          let index = newcards.findIndex(newCard => newCard.id === i.id)
          index = index === -1 ? newcards.length : index

          const cardsNew = newcards[index]?.[typeCard] || []

          newcards[index] = {
            ...i,
            [typeCard]: [...cardsNew, card]
          }
        }
      }
    })
  })

  return newcards
}
export { cardFilter }
