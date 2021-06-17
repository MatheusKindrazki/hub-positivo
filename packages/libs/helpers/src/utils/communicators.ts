import { SendInfos } from './types'
import ObservableMCF from './observer'

const observable = new ObservableMCF<SendInfos>('hub-infos')

type ObservableFn = Omit<typeof observable, 'publish' | 'dispatch' | 'clear'>

const hub = observable as ObservableFn

export { hub }
