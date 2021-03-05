import {
  CardProduct,
  Product as Solucoes
} from '~/store/modules/products/types'
import { ClassesAPI, Alunos } from '~/store/modules/myClasses/types'

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

// const classes: ClassesAPI = {}

describe('testing cardFilter funcionalities', () => {
  it('getting started', () => {
    console.log(
      cardFilter({
        data: allProductCards,
        search: 'provas',
        typeCard: 'solucoes'
      })
    )
    expect(1).toBe(1)
  })
})
