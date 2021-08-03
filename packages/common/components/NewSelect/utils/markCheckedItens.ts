import { setDefaultValues } from '@psdhub/common/components/Tree/utils'

import { getLabelsOrValues, resetAll } from '../utils'
import { SelectContextProps } from '../context/types'

function markCheckedItens(itens: string[], context: SelectContextProps): void {
  const options = context.options || []

  if (!itens.length) return

  // adiciona/reseta isChecked para todos os itens

  await resetAll(options)

  setDefaultValues(itens, options)

  context.setState({
    checked: getLabelsOrValues(options),
    raw: options
  })

  context.refresh()
}
export default markCheckedItens
