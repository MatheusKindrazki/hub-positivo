type Restricao = 'Exibir' | 'Ocultar'

type Permissions = {
  restricao: Restricao
  idSolucao: string
}

export type SchoolPermissionData = { idsEscolas: string[] } & Permissions

export type ProfilePermissionData = {
  idsPerfilNivelDeEnsino: string[]
} & Permissions

export type SchoolPermissions = {
  remove: SchoolPermissionData
  create: SchoolPermissionData
}

export interface ProfilePermissions {
  remove: ProfilePermissionData
  create: ProfilePermissionData
}

export interface GenericApiResponse {
  sucesso: boolean
  mensagem: string
}
