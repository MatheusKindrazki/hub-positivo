import {
  ProfilePermissions,
  SchoolPermissions,
  Restricao
} from '~/store/modules/permissions/types'

import { SolutionWithCategory } from './getSolutionBySlug'

export interface OldProfilePermissions {
  id: string
  idSolucao: string
  idPerfilNivelEnsino: string
}

export interface OldSchoolPermissions {
  ativo: boolean
  id: string
  idEscola: string
  idSolucao: string
  nomeEscola: string
  nomeSolucao: string
  restricao: Restricao
}

type NewPermissions = string[]

const formatProfilePermissions = (
  oldPermissions: OldProfilePermissions[],
  newPermissions: NewPermissions,
  id: string
): ProfilePermissions => {
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

export const schoolRule = (
  rule: string
): { padrao: boolean; restricao: string } => {
  if (rule === 'todas escolas') {
    return { padrao: true, restricao: 'Exibir' }
  } else if (rule === 'apenas') {
    return { padrao: true, restricao: 'Ocultar' }
  } else {
    return { padrao: false, restricao: 'Exibir' }
  }
}

export const formatFormData = (
  data: FormData,
  solutionData: SolutionWithCategory | object = { solution: {} },
  { profilePermissions, schoolsPermissions }: Params
): any => {
  const { solution } = solutionData as SolutionWithCategory

  const { restricao, padrao } = schoolRule(data.padrao)

  const formattedSolution = {
    ...solution,
    idCategoria: data.idCategoria,
    nome: data.nome,
    descricao: data.descricao,
    link: data.link,
    arquivo: '',
    tipoRenderizacao: data.tipoRenderizacao,
    padrao
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

  return {
    solution: formattedSolution,
    profilePermissions: formattedProfilePermissions,
    schoolPermissions: formattedSchoolPermissions
  }
}
