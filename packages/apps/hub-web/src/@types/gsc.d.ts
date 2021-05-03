type GSC = 'show' | 'params' | 'onSubmit' | 'trackPage'
interface GSCParams {
  is_teacher?: boolean
  is_student?: boolean
  is_coordinator?: boolean
  is_admin?: boolean
  is_family?: boolean
  selected_educational_stage?: string
  user_id?: string
  user_login?: string
  $name?: string
  user_name?: string
  user_mail?: string
  selected_role?: string
  roles_list?: string[]
  selected_school_id?: string
  selected_school_name?: string
  schools_list?: string
  is_ctpm: string
}
interface LooseBoolObject {
  [key: string]: boolean
}
interface WidgetData {
  radio?: LooseObject
  text?: string
  textarea?: string
  checkboxes?: LooseObject
  select?: LooseObject
  rating?: LooseObject
  checkbox?: boolean
}
declare global {
  export interface Window {
    gsc?: (
      method: GSC,
      options:
        | number
        | GSCParams
        | ((widgetId: number, data: WidgetData) => void)
    ) => void
  }
}
export default global
