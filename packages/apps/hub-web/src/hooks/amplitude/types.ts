interface AmplitudeUserProps {
  user_id: string
  user_login: string
  user_name: string
}

interface AmplitudeEducationalStageProps {
  educational_stage_EI: boolean
  educational_stage_EF1: boolean
  educational_stage_EF2: boolean
  educational_stage_EM: boolean
  educational_stage_stage: boolean
}

interface AmplitudeProfileProps {
  is_teacher: boolean
  is_student: boolean
  is_coordinator: boolean
  is_admin: boolean
  is_family: boolean
}

interface AmplitudeProps
  extends AmplitudeUserProps,
    AmplitudeEducationalStageProps,
    AmplitudeProfileProps {
  selected_role: string
  roles_list: string[]
  selected_school_id: string
  selected_school_name: string
  selected_school_sge: string
  school_list: string[]
  selected_class: string
  grade_level: string | '1º ano' | '2º ano' | '3º ano'
}

export default AmplitudeProps
