export interface School {
  id: string
  nome: string
  ativo: boolean
}

export interface SchoolReducer {
  loading: boolean
  schools: School[]
}
