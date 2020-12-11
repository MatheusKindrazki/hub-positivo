export interface EducationReducer {
  loading: boolean
  level: string
  levels?: LevelSelectOption[]
}

export interface LevelSelectOption {
  value: string
  label: string
}

export interface SetLevelSuccess {
  level: string
  levels?: LevelSelectOption[]
}

export interface Ciclos {
  id: number
  label: string
  value: string
}

export interface ContentResponse {
  serie: {
    ciclo: {
      id: number
      descricao: string
    }
  }
}
