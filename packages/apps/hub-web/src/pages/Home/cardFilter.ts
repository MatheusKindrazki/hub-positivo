import { CardProduct } from '~/store/modules/products/types'

interface CardFilterProps {
  data: CardProduct[]
  search: string
}

const cardFilter = (attributes: CardFilterProps): CardProduct[] => {
  const { data, search } = attributes

  if (!search) return data

  const newcards = [] as CardProduct[]

  data.forEach(i => {
    i.solucoes.forEach(card => {
      if (card.nome.toLowerCase().includes(search.toLowerCase())) {
        if (!newcards.length) {
          newcards.push({
            id: i.id,
            nome: i.nome,
            ativo: i.ativo,
            cor: i.cor,
            solucoes: [card]
          })
        } else {
          let index = newcards.findIndex(newCard => newCard.id === i.id)
          index = index === -1 ? newcards.length : index

          const cardsNew = newcards[index]?.solucoes || []

          newcards[index] = {
            id: i.id,
            nome: i.nome,
            ativo: i.ativo,
            cor: i.cor,
            solucoes: [...cardsNew, card]
          }
        }
      }
    })
  })

  return newcards
}
export { cardFilter }
