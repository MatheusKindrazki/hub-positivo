import { setDefaultValues } from '@psdhub/common/components/Tree/utils'

import { getLabelsOrValues, resetAll } from '../utils'
import { SelectContextProps } from '../context'
function markCheckedItens(itens: string[], context: SelectContextProps): void {
  const options = context.options || []

  // adiciona/reseta isChecked para todos os itens
  resetAll(options)

  setDefaultValues(itens, options)

  context.state = {
    checked: getLabelsOrValues(options),
    raw: options
  }

  context.refresh()
}
export default markCheckedItens
