import React from 'react'

import classNames from 'classnames'

import { TreeNode } from '@psdhub/common/components/Tree'
import { Box, Checkbox, Text, Divider } from '@psdhub/common/components'

interface AllValuesProps {
  index: number
  isChecked: string[]
  values?: TreeNode[]
  text?: string
  handleClick: (items: TreeNode[], disableIsMulti?: boolean) => void
}

const AllValues: React.FC<AllValuesProps> = ({
  values,
  index,
  text = 'Selecionar todos',
  isChecked,
  handleClick
}) => {
  const markChecked = values?.map(v => v.value)

  const allChecked = isChecked.length === markChecked?.length

  const isIndeterminate = isChecked?.length > 0 && !allChecked

  return (
    <Box
      key={index}
      role="button"
      pt="1"
      className={classNames({
        'hub-select-item': true
      })}
      onClick={() => handleClick(values as TreeNode[], true)}
    >
      <Checkbox
        value={markChecked?.join(',')}
        isIndeterminate={isIndeterminate}
        isChecked={allChecked}
        className={classNames({
          active: false
        })}
        size="md"
        pointerEvents="none"
      >
        <Text color="black">{text}</Text>
      </Checkbox>
      <Divider mt="2" mb="-2" borderColor="gray.400" />
    </Box>
  )
}

export default AllValues
