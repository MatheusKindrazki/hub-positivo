import { Solution } from '~/store/modules/solutions/types'
import {
  ProfilePermissions,
  SchoolPermissions,
  Restricao
} from '~/store/modules/permissions/types'

import { createSlug } from '@psdhub/common/utils'

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
  arquivo?: string[]
}

export const schoolRule = (
  rule: string
): { padrao: boolean; restricao: string } => {
  if (rule === 'todas escolas') {
    return { padrao: true, restricao: 'Exibir' }
  } else if (rule === 'apenas') {
    return { padrao: false, restricao: 'Exibir' }
  } else {
    return { padrao: true, restricao: 'Ocultar' }
  }
}

export const formatFormData = (
  data: FormData,
  solution: Solution | object = { solution: {} },
  { profilePermissions, schoolsPermissions }: Params
): any => {
  const { restricao, padrao } = schoolRule(data.padrao)
  const { id } = solution as Solution
  const { arquivo: oldIcon } = solution as Solution
  const { arquivo: newIcon } = data

  // mantem icone anterior caso nenhum seja passado
  const arquivo = newIcon?.length ? newIcon : oldIcon

  const slug = createSlug(data.nome)

  const formattedSolution = {
    ...solution,
    idCategoria: data.idCategoria,
    nome: data.nome,
    descricao: data.descricao,
    link: data.link,
    tipoRenderizacao: data.tipoRenderizacao,
    arquivo,
    padrao,
    slug
  }

  const formattedProfilePermissions = formatProfilePermissions(
    profilePermissions.old,
    data.profiles,
    id || ''
  )

  const formattedSchoolPermissions = formatSchoolPermissions(
    schoolsPermissions.old,
    data.schools,
    id || '',
    restricao as Restricao
  )

  return {
    solution: formattedSolution,
    profilePermissions: formattedProfilePermissions,
    schoolPermissions: formattedSchoolPermissions
  }
}