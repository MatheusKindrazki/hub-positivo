export type Restricao = 'Ocultar' | 'Exibir'

export type SchoolPermissions = {
  remove: {
    idSolucao: string
    idsEscolas: string[]
  }
  create: {
    idSolucao: string
    idsEscolas: string[]
    restricao?: Restricao
  }
}

export type ProfilePermissions = {
  remove: {
    idSolucao: string
    IdsPerfisNiveisEnsino: string[]
  }
  create: {
    idSolucao: string
    IdsPerfisNiveisEnsino: string[]
  }
}

export interface GenericApiResponse {
  sucesso: boolean
  mensagem: string
}

export interface ProfileLevelsBySolution {
  id: string
  idSolucao: string
  idPerfilNivelEnsino: string
}

export interface SchoolsRestrictionsBySolution {
  id: string
  idSolucao: string
  nomeSolucao: string
  idEscola: string
  nomeEscola: string
  restricao: Restricao
  ativo: boolean
}

export interface ProfilePermissionApiData {
  perfil: string
  nivelEnsino: string | null
  id: string
}

export interface PermissionsReducer {
  loading: boolean
  profileOptions: ProfilePermissionApiData[]
  profilePermissions: ProfileLevelsBySolution[] | []
  schoolPermissions: SchoolsRestrictionsBySolution[] | []
}
