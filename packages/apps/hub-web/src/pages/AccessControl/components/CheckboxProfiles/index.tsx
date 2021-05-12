import React, { useCallback, useState } from 'react'

import Checkbox from '@psdhub/common/components/Checkbox'
import { Stack } from '@psdhub/common/components'

import { BoxProps } from '~/../../../common/components/Box'

export const mockedNestedCheckboxesData = [
  {
    name: 'item pai 1',
    value: 'pai 1',
    children: [
      { name: 'item filho 1', value: 'filho 1' },
      { name: 'item filho 2', value: 'filho 2' },
      { name: 'item filho 3', value: 'filho 3' }
    ]
  },
  {
    name: 'item pai 2',
    value: 'pai 2',
    children: [
      { name: 'item filho 1', value: 'filho 1' },
      { name: 'item filho 2', value: 'filho 2' },
      { name: 'item filho 3', value: 'filho 3' }
    ]
  }
]

interface ChildItem {
  name: string
  value: string
}

interface CheckboxProfilesProps extends BoxProps {
  name: string
  value: string
  children: ChildItem[]
}

const CheckboxProfiles: React.FC<CheckboxProfilesProps> = ({
  name,
  value,
  children
}) => {
  const [checkedItems, setCheckedItems] = useState(children.map(() => false))

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  const checkChildrenElement = useCallback(
    (e, parentIndex) => {
      setCheckedItems(
        children.map((_item, childIndex) => {
          if (childIndex === parentIndex) return e.target.checked
          return checkedItems[childIndex]
        })
      )
    },
    [checkedItems, children]
  )

  return (
    <>
      <Checkbox
        value={value}
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={e => setCheckedItems(children.map(() => e.target.checked))}
      >
        {name}
      </Checkbox>
      {children.map((childItem, i) => {
        return (
          <Stack key={childItem.name} pl={6} mt={1} spacing={1}>
            <Checkbox
              value={childItem.value}
              isChecked={checkedItems[i]}
              onChange={e => checkChildrenElement(e, i)}
            >
              {childItem.name}
            </Checkbox>
          </Stack>
        )
      })}
    </>
  )
}

export default CheckboxProfiles
