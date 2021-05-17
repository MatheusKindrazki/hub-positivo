import {
  ProfilePermissions,
  SchoolPermissions,
  Restricao
} from '~/store/modules/permissions/types'

import { SolutionWithCategory } from './getSolutionBySlug'

interface OldProfilePermissions {
  id: string
  idSolucao: string
  idPerfilNivelEnsino: string
}

interface OldSchoolPermissions {
  ativo: boolean
  id: string
  idEscola: string
  idSolucao: string
  nomeEscola: string
  nomeSolucao: string
  restricao: Restricao
}

type NewPermissions = string[]

export const formatProfilePermissions = (
  oldPermissions: OldProfilePermissions[],
  newPermissions: NewPermissions,
  id: string
): ProfilePermissions => {
  console.log({ oldPermissions })
  const formattedData = {
    remove: {
      idSolucao: id,
      IdsPerfisNiveisEnsino: oldPermissions.map(e => e.idPerfilNivelEnsino)
    },
    create: {
      idSolucao: id,
      IdsPerfisNiveisEnsino: newPermissions
    }
  }

  return formattedData
}

export const formatSchoolPermissions = (
  oldPermissions: OldSchoolPermissions[],
  newPermissions: NewPermissions,
  id: string,
  restricao: Restricao
): SchoolPermissions => {
  const formattedData = {
    remove: {
      idSolucao: id,
      idsEscolas: oldPermissions.map(p => p.idEscola)
    },
    create: {
      idSolucao: id,
      idsEscolas: newPermissions,
      restricao
    }
  }

  return formattedData
}

export interface Params {
  profilePermissions: {
    old: OldProfilePermissions[]
    new: string[]
  }
  schoolsPermissions: {
    old: OldSchoolPermissions[]
    new: string[]
  }
}

export interface FormData {
  nome: string
  descricao: string
  link: string
  idCategoria: string
  profiles: string[]
  tipoRenderizacao: string
  padrao: string
  schools: string[]
}

export const formatFormData = (
  data: FormData,
  solutionData: SolutionWithCategory | object = { solution: {} },
  { profilePermissions, schoolsPermissions }: Params
): any => {
  let restricao = 'Exibir'
  const { solution } = solutionData as SolutionWithCategory
  const formattedSolution = {
    ...solution,
    idCategoria: data.idCategoria,
    nome: data.nome,
    descricao: data.descricao,
    link: data.link,
    arquivo: '',
    tipoRenderizacao: data.tipoRenderizacao,
    padrao: false
  }

  if (data.padrao === 'todas escolas') {
    formattedSolution.padrao = true
    data.schools = []
  }

  if (data.padrao === 'true') {
    formattedSolution.padrao = true
    restricao = 'Ocultar' as Restricao
    data.schools = []
  }

  if (data.padrao === 'false') {
    restricao = 'Exibir' as Restricao
    data.schools = []
  }

  const formattedProfilePermissions = formatProfilePermissions(
    profilePermissions.old,
    data.profiles,
    solution.id || ''
  )

  const formattedSchoolPermissions = formatSchoolPermissions(
    schoolsPermissions.old,
    data.schools,
    solution.id || '',
    restricao as Restricao
  )
  console.log('SOCORRRROOOOOO', data)

  return {
    solution: formattedSolution,
    profilePermissions: formattedProfilePermissions,
    schoolPermissions: formattedSchoolPermissions
  }
}
