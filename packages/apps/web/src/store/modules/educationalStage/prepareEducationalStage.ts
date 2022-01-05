export interface ContentResponse {
  value: string
  label: string
  turmas: Turma[]
}

export interface Turma {
  nomeSerie: string
  nomeTurma: string
  turmaValida: boolean
}

export interface Serie {
  class: string
  name: string
  valid: boolean
}

export interface LevelSelectOption {
  value: string
  label: string
  series: Serie[]
}

interface Response {
  selected: string
  levels: LevelSelectOption[]
}

export default function prepareStaged(data?: ContentResponse[]): Response {
  if (!data) return {} as Response
  const levels: LevelSelectOption[] = []
  let selectedLevel = ''
  let setDefaultLevel = false

  data.forEach(level => {
    if (
      !setDefaultLevel &&
      !!level.turmas.find(turma => turma.turmaValida === true)
    ) {
      if (!setDefaultLevel && !!level.turmas[0]) {
        selectedLevel = level.value
        setDefaultLevel = true
      }
    }
    const { value, label, turmas } = level

    const series = turmas.map(turma => ({
      class: turma.nomeSerie,
      name: turma.nomeTurma,
      valid: turma.turmaValida
    }))

    levels.push({ value, label, series })
  })

  return {
    selected: selectedLevel,
    levels
  }
}