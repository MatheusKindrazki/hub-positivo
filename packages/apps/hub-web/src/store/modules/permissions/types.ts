type Permissions = {
  restricao: string
  idSolucao: string
}

export type SchoolPermissionData = { idsEscolas: string[] } & Permissions

export type ProfilePermissionData = {
  idsPerfilNivelDeEnsino: string[]
} & Permissions

export type SchoolPermissions = {
  remove: Omit<SchoolPermissionData, 'restricao'>
  create: SchoolPermissionData
}

export interface ProfilePermissions {
  remove: Omit<ProfilePermissionData, 'restricao'>
  create: ProfilePermissionData
}

export interface GenericApiResponse {
  sucesso: boolean
  mensagem: string
}
