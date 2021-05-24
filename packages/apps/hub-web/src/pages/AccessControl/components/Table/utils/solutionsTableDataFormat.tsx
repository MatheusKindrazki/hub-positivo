import React from 'react'

import { Category } from '~/store/modules/solutions/types'

import SolutionData from '~/pages/AccessControl/components/Solution'
import { CollapseData } from '~/pages/AccessControl'

import { formatSchoolsRestrictions } from './formatSchoolsRestrictions'
import { formatPermissionsToString } from './formatPermissions'

export const solutionsTableDataFormat = (data: Category[]): CollapseData[] => {
  return data.map(categoria => {
    return {
      nome: categoria.nome,
      solutions: categoria.solucoes.map(
        ({ permissoes, escolas, ...solucao }) => ({
          solution: (
            <SolutionData
              solution={solucao.nome}
              file={solucao.arquivo}
              activated={solucao.ativo}
            />
          ),
          profile: permissoes.length
            ? formatPermissionsToString(permissoes)
            : 'Nenhum',
          schools: formatSchoolsRestrictions(escolas, solucao.padrao),
          data: { ...solucao, idCategoria: categoria.id }
        })
      )
    }
  })
}
