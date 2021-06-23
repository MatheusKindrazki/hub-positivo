import React, { useMemo } from 'react'

import { Collapse } from '@chakra-ui/react'

import { TreeNode } from '../../index'
import { Box, Stack } from '../../../index'
import { CaretDown } from '../../../Icons'
import { useDisclosure } from '../../../../hooks'

export interface TreeItensProps {
  parent: TreeNode
  level: number
  isCollapse?: boolean
  defaultIsOpen?: boolean
  getCheckbox(item: TreeNode): void
  getTreeWidget(options: Array<TreeNode>, level: number): React.ReactNode
}

const TreeItens: React.FC<TreeItensProps> = ({
  level,
  parent,
  isCollapse,
  getCheckbox,
  getTreeWidget,
  defaultIsOpen
}) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen })

  const isCollapseOpen = useMemo(() => {
    if (!isCollapse) return true

    return isOpen
  }, [isCollapse, isOpen])
  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        className={`hub-tree-level-${level}`}
        alignItems="center"
        py="2"
      >
        {getCheckbox(parent)}
        {isCollapse && !!parent?.options?.length ? (
          <Box
            data-testid="collapse-box"
            as={CaretDown}
            cursor="pointer"
            onClick={onToggle}
            color="blue.500"
            size="1.25rem"
            style={{
              transition: 'all .2s linear',
              transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)'
            }}
          />
        ) : null}
      </Box>
      <Collapse in={isCollapseOpen} animateOpacity>
        {parent.options && (
          <Stack pl={6} mt={1} spacing={1}>
            {getTreeWidget(parent.options, level + 1)}
          </Stack>
        )}
      </Collapse>
    </>
  )
}

export default TreeItens
