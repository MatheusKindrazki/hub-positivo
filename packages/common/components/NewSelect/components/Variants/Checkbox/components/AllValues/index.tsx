import React from 'react'

import classNames from 'classnames'

import { TreeNode } from '@psdhub/common/components/Tree'
import { Box, Checkbox, Text, Divider } from '@psdhub/common/components'

interface AllValuesProps {
  index: number
  isChecked: string[]
  values?: TreeNode[]
  handleClick: (items: TreeNode[], disableIsMulti?: boolean) => void
}

const AllValues: React.FC<AllValuesProps> = ({
  values,
  index,
  isChecked,
  handleClick
}) => {
  const markChecked = values?.map(v => v.value)

  const allChecked = isChecked.length === markChecked?.length

  return (
    <Box
      key={index}
      mt="1"
      className={classNames({
        'hub-select-item': true
      })}
      onClick={() => handleClick(values as TreeNode[], true)}
    >
      <Checkbox
        value={markChecked?.join(',')}
        isChecked={allChecked}
        className={classNames({
          active: false
        })}
        size="md"
      >
        <Text pointerEvents="none" color="black">
          Selecionar Todos
        </Text>
      </Checkbox>
      <Divider mt="2" mb="-2" borderColor="gray.400" />
    </Box>
  )
}

export default AllValues
