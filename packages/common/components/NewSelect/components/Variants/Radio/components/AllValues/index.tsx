import React from 'react'

import classNames from 'classnames'

import { TreeNode } from '@psdhub/common/components/Tree'
import { Box, Radio, Text, Divider } from '@psdhub/common/components'

export interface AllValuesProps {
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

  return (
    <Box
      key={index}
      pt="1"
      className={classNames({
        'hub-select-item': true
      })}
    >
      <Radio
        data-testid="radio-button"
        value={markChecked?.join(',')}
        isChecked={allChecked}
        className={classNames({
          active: false
        })}
        size="md"
        onClick={() => handleClick(values as TreeNode[], true)}
      >
        <Text pointerEvents="none" color="black">
          {text}
        </Text>
      </Radio>
      <Divider mt="2" mb="-2" borderColor="gray.400" />
    </Box>
  )
}

export default AllValues
