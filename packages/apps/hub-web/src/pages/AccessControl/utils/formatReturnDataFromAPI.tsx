import React from 'react'

import { Solutions } from '~/store/modules/solutions/types'

import { formatSchoolsRestrictions } from './formatSchoolsRestrictions'
import { formatPermissions } from './formatPermissions'
import { CollapseData } from '../index'
import SolutionData from '../components/Solution'

export const formatReturnDataFromAPI = (data: Solutions[]): CollapseData[] => {
  return data.map(categoria => {
    return {
      nome: categoria.nome,
      solutions: categoria.solucoes.map(
        ({ permissoes, escolas, ...solucao }) => ({
          solution: (
            <SolutionData
              solution={solucao.nome}
              order={solucao.ordem}
              file={solucao.arquivo}
              activated={solucao.ativo}
            />
          ),
          profile: permissoes.length ? formatPermissions(permissoes) : 'Nenhum',
          schools: formatSchoolsRestrictions(escolas, solucao.padrao),
          data: { ...solucao, idCategoria: categoria.id }
        })
      )
    }
  })
}
