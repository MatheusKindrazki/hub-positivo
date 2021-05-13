export type SchoolPermissions = {
  remove: {
    idSolucao: string
    idsEscolas: string[]
  }
  create: {
    idSolucao: string
    idsEscolas: string[]
    restricao: 'Ocultar' | 'Exibir'
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
