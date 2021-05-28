import { Category } from '~/store/modules/solutions/types'

import getSolutionBySlug from '~/pages/AccessControl/utils/getSolutionBySlug'

const mock: Category[] = [
  {
    id: 'id',
    nome: 'categoria',
    ordem: 1,
    ativo: true,
    solucoes: [
      {
        id: 'id',
        nome: 'nome',
        descricao: 'descricao',
        arquivo: 'arquivo',
        link: 'link',
        tipoRenderizacao: 'tipoRenderizacao',
        slug: 'slug-slug',
        padrao: true,
        ordem: 1,
        ativo: true,
        permissoes: [],
        escolas: [],
        notificacao: 'notificacao'
      }
    ]
  }
]
describe('getSolutionBySlug should work properly', () => {
  it('Should returns the matched solution', () => {
    const result = getSolutionBySlug(mock, mock[0].solucoes[0].slug)
    expect(result).toStrictEqual({
      ...mock[0].solucoes[0],
      category: { label: mock[0].nome, value: mock[0].id }
    })
  })

  it('Should returns undefined when there`s not matched solution', () => {
    const result = getSolutionBySlug(mock, 'slug-inexistente')
    expect(result).toBeUndefined()
  })
})
