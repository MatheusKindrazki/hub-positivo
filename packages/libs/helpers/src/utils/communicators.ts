import { SendInfos, InformationsProps } from './types'
import ObservableMCF from './observer'

const observable = new ObservableMCF<SendInfos>('hub-infos')

type HubFN = Omit<typeof observable, 'publish' | 'dispatch' | 'clear'> & {
  subscribe(data: InformationsProps): void
  unsubscribe(data: InformationsProps): void
}

export type PostFnProps = typeof observable

const getInformations = observable as HubFN

export { getInformations }
