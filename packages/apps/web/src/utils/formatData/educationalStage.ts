import { store } from '~/store'

import { StageTypesProps } from './types'

interface EducationalProps {
  activeStages: {
    [key: string]: boolean
  }
  selected_class?: string
  selected_educational_stage?: string
}

export default (): EducationalProps => {
  const educationalStage = store.getState().educationalStage

  const selected_class = educationalStage.class
  const selected_educational_stage = educationalStage.level

  const stageNames = educationalStage.levels?.map(s => s.value)

  const stageTypes = {
    educational_stage_EI: 'EI',
    educational_stage_EF1: 'EF1',
    educational_stage_EF2: 'EF2',
    educational_stage_EM: 'EM',
    educational_stage_PRE: 'PRE'
  }

  // Criar um objeto de níveis de ensino ativos
  const activeStages: any = {}
  Object.keys(stageTypes).forEach(p => {
    const types = stageTypes[p as StageTypesProps]

    let length = stageNames?.length || 0
    stageNames?.forEach((n, i) => {
      if (n === types) {
        activeStages[p] = true

        length = 999
        return
      }

      if (length - 1 === i) {
        activeStages[p] = false
      }
    })
  })

  return { activeStages, selected_class, selected_educational_stage }
}
