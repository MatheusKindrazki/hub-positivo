import { Category } from '~/store/modules/solutions/types'

import { TableData } from '../pages/Trash'

export const trashDataFormat = (data: Category[]): TableData[] => {
  return data.reduce((accumulator: TableData[], category) => {
    category.solucoes.map(s =>
      accumulator.push({
        ...s,
        tipoRenderizacao:
          s.tipoRenderizacao === 'iframe' ? 'Mesma janela' : 'Nova janela',
        categoria: category.nome
      })
    )
    return accumulator
  }, [])
}
