import { Category } from '~/store/modules/solutions/types'

import { TableData } from '../index'

export const trashDataFormat = (data: Category[]): TableData[] => {
  return data.reduce((accumulator: TableData[], category) => {
    category.solucoes.forEach(s =>
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
