import React from 'react'

import { Columns } from '@psdhub/common/components/Table'
import { Switch } from '@psdhub/common/components'

import Solution from './components/Solution'

export const columns: Columns[] = [
  { property: 'solution', header: 'Solução' },
  { property: 'profile', header: 'Perfis' },
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
    profile: 'Aluno (EF1, EF2)',
    schools: 'Todas'
  },
  {
    solution: <Solution solution="Atividades" />,
    profile:
      'Aluno (EF1, EF2), Coordenador (EM, EF1, EF2), Professor (EM, EF2, EF1)',
    schools: 'Todas exceto: Escola 2'
  }
]

export const mockedData = [
  { name: 'Collapse 1' },
  { name: 'Collapse 2' },
  { name: 'Collapse 3' }
]

export const apiReturn = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nome: 'Recursos',
    cor: 'blue',
    ordem: 0,
    ativo: true,
    solucoes: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        nome: 'Salas virtuais',
        descricao: 'descrição',
        arquivo: 'arquivo',
        link: 'link',
        tipoRenderizacao: 'iframe',
        slug: 'salas-virtuais',
        padrao: true,
        ordem: 0,
        ativo: true,
        permissoes: [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            perfil: 'Professor',
            nivelEnsino: ['EM', 'EF1', 'EF2']
          },
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            perfil: 'Aluno',
            nivelEnsino: ['EM']
          }
        ],
        restricoes: [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            idEscola: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            nomeEscola: 'Nome da escola'
          }
        ]
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        nome: 'Plano semanal',
        descricao: 'descrição',
        arquivo: 'arquivo',
        link: 'link',
        tipoRenderizacao: 'iframe',
        slug: 'plano-semanal',
        padrao: true,
        ordem: 0,
        ativo: true,
        permissoes: [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            perfil: 'Administrador',
            nivelEnsino: ['EM', 'EF1', 'EF2']
          },
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            perfil: 'Coordenador',
            nivelEnsino: ['EM', 'EF2']
          }
        ],
        restricoes: [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            idEscola: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            nomeEscola: 'Nome da escola'
          },
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            idEscola: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            nomeEscola: 'Nome da escola 2'
          }
        ]
      }
    ]
  }
]
