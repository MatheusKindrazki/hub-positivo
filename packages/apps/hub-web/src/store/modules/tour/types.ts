export interface TourReducer {
  viewed: boolean
  loading: boolean
  viewedLoaded: boolean
  open: boolean
  steps?: StepsTour[]
}
export interface StepsTour {
  selector: string
  content: string
  position?: 'top' | 'right' | 'bottom' | 'left' | 'center'
}

export interface StepsTourResponseApi {
  id: string
  ordem: boolean
  perfil: string
  seletor: string
  conteudo: string
  posicao?: 'top' | 'right' | 'bottom' | 'left' | 'center'
}
