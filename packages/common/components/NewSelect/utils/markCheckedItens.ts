import {
  setDefaultValues,
  getObjectValues
} from '@psdhub/common/components/Tree/utils'

import { SelectContextProps } from '../context'

function markCheckedItens(itens: string[], context: SelectContextProps): void {
  const options = context.options || []

  setDefaultValues(itens, options)

  context.state = {
    checked: getObjectValues(options),
    raw: options
  }

  context.refresh()
}

export default markCheckedItens
