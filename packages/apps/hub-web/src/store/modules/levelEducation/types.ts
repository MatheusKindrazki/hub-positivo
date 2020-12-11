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
