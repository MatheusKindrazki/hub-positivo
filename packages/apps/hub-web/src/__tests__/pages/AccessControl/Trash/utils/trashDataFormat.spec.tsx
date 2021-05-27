import { Category } from '~/store/modules/solutions/types'

import { trashDataFormat } from '~/pages/AccessControl/pages/Trash/utils/trashTableDataFormat'
import { TableData } from '~/pages/AccessControl/pages/Trash'

const mock = {
  arquivo: 'arquivo',
  ativo: false,
  categoria: 'categoria',
  descricao: 'descricao',
  escolas: [],
  padrao: true,
  id: 'id',
  nome: 'nome',
  ordem: 1,
  permissoes: [],
  slug: 'slug',
  tipoRenderizacao: 'Mesma janela',
  link: 'link',
  notificacao: 'notificacao'
}
const tableData = (
  tipoRenderizacao: 'Mesma janela' | 'Nova janela'
): TableData[] => [{ ...mock, tipoRenderizacao }]

const trashData = (tipoRenderizacao: string): Category[] => [
  {
    id: mock.id,
    nome: mock.categoria,
    ordem: mock.ordem,
    ativo: true,
    solucoes: [
      {
        id: mock.id,
        nome: mock.nome,
        descricao: mock.descricao,
        arquivo: mock.arquivo,
        link: mock.link,
        tipoRenderizacao,
        slug: mock.slug,
        padrao: mock.padrao,
        ordem: mock.ordem,
        ativo: mock.ativo,
        permissoes: mock.permissoes,
        escolas: mock.escolas,
        notificacao: mock.notificacao
      }
    ]
  }
]

describe('trashDataFormat should work properly', () => {
  it('Should format correctly when /tipoRenderizacao/ is iframe', () => {
    const formattedTrashData = trashDataFormat(trashData('iframe'))
    expect(formattedTrashData).toStrictEqual(tableData('Mesma janela'))
  })

  it('Should format correctly when /tipoRenderizacao/ is not iframe', () => {
    const formattedTrashData = trashDataFormat(trashData('microfrontend'))
    expect(formattedTrashData).toStrictEqual(tableData('Nova janela'))
  })
})
