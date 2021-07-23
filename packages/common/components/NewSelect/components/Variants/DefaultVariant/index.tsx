import React, { useContext, memo } from 'react'

import classNames from 'classnames'

import { getObjectValues } from '@psdhub/common/components/Tree/utils'
import { Box, Text } from '@psdhub/common/components'

import { ContainerOptions } from './styles'
import { handleParents } from '../../../utils'
import { TreeNode } from '../../../types'
import SelectContext from '../../../context'

const DefaultVariant: React.FC = () => {
  const { options, state, isMulti, ...context } = useContext(SelectContext)

  const handleClick = (item: TreeNode) => {
    const prepareItem = { ...item, isChecked: 1 }

    const items = handleParents(state.raw, prepareItem, isMulti)

    context.onChange(getObjectValues(items), items)

    context.onClose()
  }

  const checkSelectedItem = (item: TreeNode) => {
    const findIndex = state.raw.findIndex(i => i.value === item.value)

    return findIndex !== -1
  }

  context.refresh = () => {
    console.log('brasil')
  }

  return (
    <ContainerOptions className="hub-select-options">
      {options?.map((option, index) => (
        <Box
          key={index}
          className={classNames({
            active: checkSelectedItem(option),
            'hub-select-item': true
          })}
          role="button"
          onClick={() => handleClick(option)}
        >
          <Text color="black">{option.label}</Text>
        </Box>
      ))}
    </ContainerOptions>
  )
}

export default memo(DefaultVariant)
