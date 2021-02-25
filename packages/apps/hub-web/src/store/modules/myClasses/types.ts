export interface ClassesAPI {
  id: number
  ativo: boolean
  nome: string
  serie: {
    nome: string
  }
  alunos: Alunos[]
}

interface Alunos {
  ativo: boolean
  nome: string
  idUsuarioUnico: string
}

export interface ClassesReducer {
  loading: boolean
  classes?: ClassesAPI[]
}
