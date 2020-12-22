import { StepsTour } from '@hub/common/components/Tour'
export interface TourReducer {
  viewed: boolean
  loading: boolean
  open: boolean
  steps?: StepsTour[]
}
