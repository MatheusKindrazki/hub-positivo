import { ClassesAPI } from '~/store/modules/myClasses/types'

interface CardFilterProps {
  data: ClassesAPI[]
  search: string
}

const cardFilter = (attributes: CardFilterProps): ClassesAPI[] => {
  const { data, search } = attributes

  if (!search) return data

  const newcards = [] as ClassesAPI[]

  data.forEach(i => {
    i.alunos.forEach(card => {
      if (card.nome.toLowerCase().includes(search.toLowerCase())) {
        if (!newcards.length) {
          newcards.push({
            id: i.id,
            ativo: i.ativo,
            nome: i.nome,
            serie: i.serie,
            alunos: [card]
          })
        } else {
          let index = newcards.findIndex(newCard => newCard.id === i.id)
          index = index === -1 ? newcards.length : index

          const cardsNew = newcards[index]?.alunos || []

          newcards[index] = {
            id: i.id,
            ativo: i.ativo,
            nome: i.nome,
            serie: i.serie,
            alunos: [...cardsNew, card]
          }
        }
      }
    })
  })

  return newcards
}
export { cardFilter }
