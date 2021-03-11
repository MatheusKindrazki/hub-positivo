import { Schools, User } from '~/store/modules/user/types'

interface PageViewed {
  page_path: string
  page_title: string
  page_url: string
  user_role: string
  user_school: string | undefined
}
interface AmplitudeUserProps {
  user_id?: string
  user_login?: string
  user_name: string | null
}

interface AmplitudeEducationalStageProps {
  educational_stage_EI: boolean | undefined
  educational_stage_EF1: boolean | undefined
  educational_stage_EF2: boolean | undefined
  educational_stage_EM: boolean | undefined
}

interface AmplitudeProfileProps {
  is_teacher: boolean | undefined
  is_student: boolean | undefined
  is_coordinator: boolean | undefined
  is_admin: boolean | undefined
  is_family: boolean | undefined
}

interface AmplitudeProps
  extends AmplitudeUserProps,
    AmplitudeEducationalStageProps,
    AmplitudeProfileProps {
  selectedRole: string
  roles_list?: string[]
  selected_school_id: string
  selected_school_name: string
  selected_school_sge: string | null
  schools_list?: Schools[]
  selected_class?: string
  // level: string | '1º ano' | '2º ano' | '3º ano'
  selected_educational_stage: string
}

interface School {
  value: string
  label: string
}

export type {
  AmplitudeProps,
  PageViewed,
  AmplitudeEducationalStageProps,
  School,
  User
}
