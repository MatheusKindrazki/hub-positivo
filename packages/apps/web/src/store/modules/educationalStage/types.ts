export interface EducationReducer {
  loading: boolean
  level: string
  class?: string
  levels?: LevelSelectOption[]
}

export interface LevelSelectOption {
  value: string
  label: string
  series: Serie[]
}

export interface Serie {
  class: string
  name: string
  valid: boolean
}

export interface setEducationalStageSuccess {
  level: string
  class?: string
  levels?: LevelSelectOption[]
}
