export interface EducationReducer {
  loading: boolean
  level: string
  levels?: LevelSelectOption[]
}

export interface LevelSelectOption {
  value: string
  label: string
}

export interface setEducationalStageSuccess {
  level: string
  levels?: LevelSelectOption[]
}

export interface ContentResponse {
  value: string
  label: string
}
