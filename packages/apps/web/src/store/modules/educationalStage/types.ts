export interface EducationReducer {
  loading: boolean
  level: string
  class?: string
  levels?: LevelSelectOption[]
}

export interface LevelSelectOption {
  value: string
  label: string
  series: string[]
}

export interface setEducationalStageSuccess {
  level: string
  class?: string
  levels?: LevelSelectOption[]
}
