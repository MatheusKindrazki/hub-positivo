import React from 'react'

import { Columns } from '@psdhub/common/components/Table'
import { Switch } from '@psdhub/common/components'

import Solution from './components/Solution'

export const columns: Columns[] = [
  { property: 'solution', header: 'Solução' },
  { property: 'profile', header: 'Perfis' },
  { property: 'segments', header: 'Segmentos' },
  { property: 'schools', header: 'Escolas' },
  {
    property: 'edit',
    header: null,
    render: (_e: any) => 'EDITAR'
  },
  {
    property: 'active',
    header: null,
    render: (_e: any) => <Switch />
  }
]

export const data: any = [
  {
    solution: <Solution solution="Guia de Estudo" />,
    profile: 'Todos os perfis',
    segments: 'EF1, EF2, EM',
    schools: 'Todas'
  },
  {
    solution: <Solution solution="Atividades" />,
    profile: 'Todos os perfis',
    segments: 'EF1, EF2, EM',
    schools: 'Todas'
  }
]

export const mockedData = [
  { name: 'Collapse 1' },
  { name: 'Collapse 2' },
  { name: 'Collapse 3' }
]
