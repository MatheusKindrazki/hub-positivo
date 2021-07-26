import React, { useContext, useState } from 'react'

import classNames from 'classnames'

import { getObjectValues } from '@psdhub/common/components/Tree/utils'
import { Box, Text } from '@psdhub/common/components'

import { ContainerOptions } from './styles'
import { handleParents, filterRecursive } from '../../../utils'
import { TreeNode } from '../../../types'
import SelectContext from '../../../context'

const DefaultVariant: React.FC = () => {
  const context = useContext(SelectContext)

  const { options, state, isMulti } = context

  const [renderedOptions, setRenderedOptions] = useState(options)

  const handleClick = (item: TreeNode) => {
    const prepareItem = { ...item, isChecked: 1 }

    const items = handleParents(state.raw, prepareItem, isMulti)

    context.onChange(getObjectValues(items), items)

    context.refresh()
  }

  const checkSelectedItem = (item: TreeNode) => {
    const isChecked = state.raw.find(i => {
      if (i.value === item.value) {
        return i.isChecked
      }

      return false
    })

    return isChecked
  }

  context.searchable = (e: string) => {
    if (!e) return setRenderedOptions(options)

    const filteredOptions = filterRecursive<TreeNode>(options, e)
    setRenderedOptions(filteredOptions)
  }

  return (
    <ContainerOptions className="hub-select-options">
      {renderedOptions?.map((option, index) => (
        <Box
          key={index}
          className={classNames({
            active: checkSelectedItem(option),
            'hub-select-item': true
          })}
          role="button"
          onClick={() => handleClick(option)}
        >
          <Text pointerEvents="none" color="black">
            {option.label}
          </Text>
        </Box>
      ))}
    </ContainerOptions>
  )
}

export default DefaultVariant
