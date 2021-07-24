import {
  setDefaultValues,
  getObjectValues
} from '@psdhub/common/components/Tree/utils'

import { TreeNode } from '../types'
import { SelectContextProps } from '../context'
function markCheckedItens(itens: string[], context: SelectContextProps): void {
  const options = context.options || []

  // adiciona isChecked para todos os itens
  addIsChecked(options)

  setDefaultValues(itens, options)

  context.state = {
    checked: getObjectValues(options),
    raw: options
  }

  context.refresh()
}

const addIsChecked = (options: TreeNode[]): void => {
  options.forEach(option => {
    option.isChecked = 0
    if (option.options?.length) {
      addIsChecked(option.options)
    }
  })
}

export default markCheckedItens
