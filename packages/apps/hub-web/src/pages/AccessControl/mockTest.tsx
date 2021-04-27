import React from 'react'

import { Columns } from '@psdhub/common/components/Table'

export const columns: Columns[] = [
  { property: 'solution', header: 'Solução' },
  { property: 'profile', header: 'Perfis' },
  { property: 'segments', header: 'Segmentos' },
  { property: 'schools', header: 'Escolas' },
  {
    property: 'actions',
    header: null,
    render: (e: any) => <button onClick={() => console.log(e)}>BOTÃO</button>
  }
]

export const data: any = [
  {
    solution: 'Guia de Estudo',
    profile: 'Todos os perfis',
    segments: 'EF1, EF2, EM',
    schools: 'Todas'
  },
  {
    solution: 'Atividades',
    profile: 'Todos os perfis',
    segments: 'EF1, EF2, EM',
    schools: 'Todas'
  }
]
