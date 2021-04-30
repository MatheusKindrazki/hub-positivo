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
        ({ nome, permissoes, escolas, padrao, ordem, ativo, arquivo, id }) => ({
          solution: (
            <SolutionData
              solution={nome}
              order={ordem}
              file={arquivo}
              activated={ativo}
            />
          ),
          profile: permissoes.length ? formatPermissions(permissoes) : 'Nenhum',
          schools: formatSchoolsRestrictions(escolas, padrao),
          activated: ativo,
          id
        })
      )
    }
  })
}
