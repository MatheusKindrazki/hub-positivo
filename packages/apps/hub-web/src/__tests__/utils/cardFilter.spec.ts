import { CardProduct } from '~/store/modules/products/types'
import { ClassesAPI } from '~/store/modules/myClasses/types'

import { cardFilter } from '~/utils/cardFilter'

const allProductCards: CardProduct[] = [
  {
    id: 'avaliacaoId',
    ativo: true,
    cor: 'blue',
    nome: 'Avaliação',
    solucoes: [
      {
        ativo: true,
        descricao: 'description',
        id: 'provasId',
        arquivo: 'file',
        nome: 'Provas',
        link: 'psd.provas.com',
        tipoRenderizacao: 'renderType',
        notificacao: 'notification'
      }
    ]
  },
  {
    id: 'administracaoId',
    ativo: true,
    cor: 'blue',
    nome: 'Administração',
    solucoes: [
      {
        ativo: true,
        descricao: 'description',
        id: 'gerenciarTurmasId',
        arquivo: 'file',
        nome: 'Gerenciar turmas',
        link: 'psd.gerenciarTurmas.com',
        tipoRenderizacao: 'renderType',
        notificacao: 'notification'
      }
    ]
  },
  {
    id: 'comunicacaoId',
    ativo: true,
    cor: 'blue',
    nome: 'Comunicação',
    solucoes: [
      {
        ativo: true,
        descricao: 'description',
        id: 'diarioDeTurmaId',
        arquivo: 'file',
        nome: 'Diário de turma',
        link: 'psd.gerenciarTurmas.com',
        tipoRenderizacao: 'renderType',
        notificacao: 'notification'
      }
    ]
  }
]

const allClassesCards: ClassesAPI[] = [
  {
    id: 1,
    ativo: true,
    nome: 'Matemática',
    serie: {
      nome: '5 ano'
    },
    alunos: [
      {
        ativo: true,
        nome: 'João',
        idUsuarioUnico: 'joaoId'
      }
    ]
  },
  {
    id: 2,
    ativo: true,
    nome: 'Geografia',
    serie: {
      nome: '7 ano'
    },
    alunos: [
      {
        ativo: true,
        nome: 'Maria Joana',
        idUsuarioUnico: 'mariaId'
      },
      {
        ativo: true,
        nome: 'João Maria',
        idUsuarioUnico: 'anaId'
      }
    ]
  },
  {
    id: 3,
    ativo: true,
    nome: 'Filosofia',
    serie: {
      nome: '1 ano'
    },
    alunos: [
      {
        ativo: true,
        nome: 'Maria Leticia',
        idUsuarioUnico: 'leticiaId'
      },
      {
        ativo: true,
        nome: 'Rafael',
        idUsuarioUnico: 'rafaelId'
      }
    ]
  }
]

describe('testing cardFilter funcionalities', () => {
  it('Should return only the `product cards` that matches with text search', () => {
    const cardFiltered = cardFilter({
      data: allProductCards,
      search: 'provas',
      typeCard: 'solucoes'
    })

    const avaliacoes = allProductCards[0]
    const provasCard = avaliacoes.solucoes[0]

    expect(cardFiltered).toHaveLength(1)
    expect(cardFiltered).toStrictEqual([
      { ...avaliacoes, solucoes: [provasCard] }
    ])
  })

  it('Should return only the `classes cards` that matches with text search without crashing when findIndex returns -1', () => {
    const classFiltered = cardFilter({
      data: allClassesCards,
      search: 'maria',
      typeCard: 'alunos'
    })

    const geografiaClass = allClassesCards[1]
    const mariaJoanaStudent = geografiaClass.alunos[0]
    const joaoMariaStudent = geografiaClass.alunos[1]

    const filosofiaClass = allClassesCards[2]
    const mariaLeticiaStudent = filosofiaClass.alunos[0]

    expect(classFiltered).toHaveLength(2)
    expect(classFiltered).toStrictEqual([
      { ...geografiaClass, alunos: [mariaJoanaStudent, joaoMariaStudent] },
      { ...filosofiaClass, alunos: [mariaLeticiaStudent] }
    ])
  })

  it('Should return an empty array when search text wasn`t matches with any card', () => {
    const dataFiltered = cardFilter({
      data: allClassesCards,
      search: 'batata',
      typeCard: 'alunos'
    })

    expect(dataFiltered).toHaveLength(0)
    expect(dataFiltered).toStrictEqual([])
  })

  it('Should return data without  changes when search text was not provided', () => {
    const dataFiltered = cardFilter({
      data: allClassesCards,
      search: null,
      typeCard: 'alunos'
    })

    expect(dataFiltered).toHaveLength(3)
    expect(dataFiltered).toStrictEqual(allClassesCards)
  })
})
